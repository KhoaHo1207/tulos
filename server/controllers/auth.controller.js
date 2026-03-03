import mongoose from "mongoose";
import User from "../models/user.model.js";
import { apiStatus } from "../constants/APIStatus.js";
import { errorMessage } from "../constants/errorMessage.js";
import bcrypt from "bcryptjs";
import generateAvatarUrl from "../utils/avatar.util.js";
import { SignInSchema, signUpSchema } from "../schema/auth.schema.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/jwt.js";

export const signUp = async (req, res) => {
  try {
    const { email, password, fullName, phone, address, avatar_url } = req.body;
    const { error } = signUpSchema.safeParse(req.body);
    if (error) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(apiStatus.CONFLICT).json({
        success: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
      phone,
      address,
      avatar_url: avatar_url || generateAvatarUrl(fullName),
    });

    return res.status(apiStatus.CREATED).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error in signUp controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = SignInSchema.safeParse(req.body);
    if (error) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(apiStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid password",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken });

    return res.status(apiStatus.OK).json({
      success: true,
      message: "Sign in successful",
      results: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    console.log("Error in signIn controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};
