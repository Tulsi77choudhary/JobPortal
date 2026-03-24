const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  uploadResume,
} = require("./controllers/profileController");

const { protect } = require("./middleware/authMiddleware");

// 🔒 All routes protected
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.put("/resume", protect, uploadResume);

export default router;