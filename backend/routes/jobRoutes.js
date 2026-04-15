import express from "express";
const router = express.Router();

import {
  createJob,
  getAllJobs,
  searchJobsByTitleAndLocation,
  getJobById,
  updateJob,
  deleteJob,
  applyJob,
} from "../controllers/jobController.js";

import { protect } from "../middleware/authMiddleware.js";

// Public Routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected Routes
router.post("/search", searchJobsByTitleAndLocation);
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.post("/:id/apply", protect, applyJob);


export default router;