import Type from "../models/type.model.js";
import { apiStatus } from "../constants/apiStatus.js";
import { errorMessage } from "../constants/errorMessage.js";
import { createTypeSchema, updateTypeSchema } from "../schema/type.schema.js";

export const createType = async (req, res) => {
  try {
    const { error, data } = createTypeSchema.safeParse(req.body);

    if (error) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const { name } = data;

    const isTypeExists = await Type.findOne({ name });

    if (isTypeExists) {
      return res.status(apiStatus.CONFLICT).json({
        success: false,
        message: "Type already exists",
      });
    }

    const newType = await Type.create({
      name: name,
    });

    return res.status(apiStatus.CREATED).json({
      success: true,
      message: "Type created successfully",
    });
  } catch (error) {
    console.log("Error in createType controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find();

    return res.status(apiStatus.OK).json({
      success: true,
      message: "Types fetched successfully",
      results: types,
    });
  } catch (error) {
    console.log("Error in getAllTypes controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateType = async (req, res) => {
  try {
    const { id } = req.params;

    const type = await Type.findById(id);

    if (!type) {
      return res.status(apiStatus.NOT_FOUND).json({
        success: false,
        message: "Type not found",
      });
    }

    const { error, data } = updateTypeSchema.safeParse(req.body);

    if (error) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const { name } = data;

    const newType = await Type.findByIdAndUpdate(id, { name }, { new: true });

    return res.status(apiStatus.OK).json({
      success: true,
      message: "Type updated successfully",
      results: newType,
    });
  } catch (error) {
    console.log("Error in updateType controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    const type = await Type.findByIdAndDelete(id);

    if (!type) {
      return res.status(apiStatus.NOT_FOUND).json({
        success: false,
        message: "Type not found",
      });
    }

    return res.status(apiStatus.OK).json({
      success: true,
      message: "Type deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteType controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
