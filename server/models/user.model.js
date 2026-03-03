import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Full name must be at least 3 characters long"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      length: [10, "Phone number must be 10 digits long"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Address must be at least 3 characters long"],
    },
    avatar_url: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: {
      type: String,
      trim: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
