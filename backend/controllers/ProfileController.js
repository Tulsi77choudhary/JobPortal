import User from "../models/User.js";
import Job from "../models/Job.js";

// GET /api/profile
export const getProfile = async (req, res) => {
  try {
    // 👤 User data
    const user = await User.findById(req.user._id).select("-password");

    // 📄 Applied jobs
    const appliedJobs = await Job.find({
      applicants: req.user._id
    }).select("title company location jobType");

    res.status(200).json({
      success: true,
      user,
      appliedJobs, 
    });

  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, skills, location } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (location) user.location = location;

    if (skills) {
      user.skills = skills.split(",");
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// PUT /api/profile/resume
export const uploadResume = async (req, res) => {
  try {
    const { resume } = req.body;

    const user = await User.findById(req.user._id);

    user.resume = resume;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume updated",
      resume: user.resume,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};