import Job from "../models/Job.js";

/**
 * @desc    Create Job
 * @route   POST /api/jobs
 * @access  Employer
*/

export const createJob = async (req, res) => {
  try {
    // 🔒 Role check
    if (req.user.role !== "recruiter" && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can post jobs",
      });
    }

    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      skillsRequired,
      applicationDeadline,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      skillsRequired,
      applicationDeadline,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get All Jobs
 * @route   GET /api/jobs
 * @access  Public
 */
export const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      skills,
      minSalary,
      maxSalary,
      page = 1,
      limit = 5,
      sort = "latest",
    } = req.query;

    let query = {};

    // 🔍 Keyword Search (search in title)
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" }; 
    }

    // 📍 Location Filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // 💼 Job Type Filter
    if (jobType) {
      query.jobType = jobType.toLowerCase();
    }

    // 🧠 Skills Filter
    if (skills) {
      const skillsArray = skills.split(",").map(s => s.trim());
      query.skillsRequired = { $in: skillsArray };
    }

    // 💰 Salary Filter
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    // ⭐ Sorting
    let sortOption = { createdAt: -1 }; // default latest
    if (sort === "salary") sortOption = { salary: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    // 📄 Pagination
    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .populate("postedBy", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchJobsByTitleAndLocation = async (req, res) => {
  try {
    const { title, location } = req.body;

    let query = {};

    if (title) {
      const keywords = title.trim().split(" "); 
      query.title = {
        $regex: keywords.join("|"), 
        $options: "i"
      };
    }

    // 📍 Location Search
    if (location) {
      query.location = {
        $regex: location.trim(),
        $options: "i"
      };
    }

    const jobs = await Job.find(query)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * @desc    Get Single Job
 * @route   GET /api/jobs/:id
 * @access  Public
 */

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update Job
 * @route   PUT /api/jobs/:id
 * @access  Employer
 */
export const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

    // Check ownership
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Job updated",
      job,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete Job
 * @route   DELETE /api/jobs/:id
 * @access  Employer
*/

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

    // Check ownership
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Apply for Job
 * @route   POST /api/jobs/:id/apply
 * @access  Job Seeker
*/

export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

    // Prevent duplicate apply
    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this job",
      });
    }

    job.applicants.push(req.user._id);
    await job.save();

    res.status(200).json({
      success: true,
      message: "Applied successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};