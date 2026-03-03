import mongoose from "mongoose";
import User from "../models/user.model.js";
import { apiStatus } from "../constants/apiStatus.js";
import { errorMessage } from "../constants/errorMessage.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res.status(apiStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(apiStatus.OK).json({
      success: true,
      message: "User fetched successfully",
      results: user,
    });
  } catch (error) {
    console.log("Error in getUser controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};
