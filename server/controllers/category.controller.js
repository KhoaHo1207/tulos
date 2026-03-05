import Category from "../models/category.model.js";
import { apiStatus } from "../constants/apiStatus.js";
import { errorMessage } from "../constants/errorMessage.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schema/category.schema.js";
import { createSlug } from "../utils/create-slug.js";

export const createCategory = async (req, res) => {
  try {
    const { data, error } = createCategorySchema.safeParse(req.body);

    if (error) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const { title, description, image } = data;

    // 1. tạo category trước (Mongo tạo _id)
    const category = await Category.create({
      title,
      description,
      image,
    });

    // 2. tạo slug từ title + id
    const slug = createSlug(`${title}-${category._id}`);

    // 3. update slug
    category.slug = slug;
    await category.save();

    return res.status(apiStatus.CREATED).json({
      success: true,
      message: "Category created successfully",
      results: category,
    });
  } catch (error) {
    console.log("Error in createCategory controller", error);

    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(apiStatus.OK).json({
      success: true,
      message: "Categories fetched successfully",
      results: categories,
    });
  } catch (error) {
    console.log("Error in getAllCategories controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error } = updateCategorySchema.safeParse(req.body);

    if (error) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
    const { title, slug, description, image } = req.body;

    if (!slug) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: "Category not found",
      });
    }
    const category = await Category.findOneAndUpdate(
      { slug },
      { title, slug, description, image },
      { new: true }
    );
    return res.status(apiStatus.OK).json({
      success: true,
      message: "Category updated successfully",
      results: category,
    });
  } catch (error) {
    console.log("Error in updateCategory controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = await Category.findOneAndDelete({ slug });

    if (!category) {
      return res.status(apiStatus.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(apiStatus.OK).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteCategory controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};
