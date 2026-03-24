import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["user", "recruiter", "admin"],
    default: "user",
  },

  skills: {
    type: [String],
    default: [],
  },

  resume: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;