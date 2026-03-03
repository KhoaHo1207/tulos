import { apiStatus } from "../constants/apiStatus.js";
import { errorMessage } from "../constants/errorMessage.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(apiStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(apiStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyAccessToken middleware", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

export const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role.toLowerCase().trim()) {
      return res.status(apiStatus.FORBIDDEN).json({
        success: false,
        message: "Forbidden",
      });
    }
    next();
  };
};
