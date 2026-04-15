import express from "express";
const router = express.Router();

import { getProfile,updateProfile, uploadResume } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

// 🔒 All routes protected
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.put("/resume", protect, uploadResume);

export default router;