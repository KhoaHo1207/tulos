import Store from "../models/store.model.js";
import { apiStatus } from "../constants/apiStatus.js";
import { errorMessage } from "../constants/errorMessage.js";
import {
  createStoreSchema,
  updateStoreSchema,
} from "../schema/store.schema.js";

export const createStore = async (req, res) => {
  try {
    const { data, error } = createStoreSchema.safeParse(req.body);

    if (error) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const { name, description, location, phone, email, image } = data;

    const isStoreExists = await Store.findOne({ location });

    if (isStoreExists) {
      return res.status(apiStatus.CONFLICT).json({
        success: false,
        message: "Store already exists",
      });
    }

    const newStore = await Store.create({
      name,
      description,
      location,
      phone,
      email,
      image,
    });

    return res.status(apiStatus.CREATED).json({
      success: true,
      message: "Store created successfully",
    });
  } catch (error) {
    console.log("Error in createStore controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();

    return res.staus(apiStatus.OK).json({
      success: true,
      message: "Stores fetched successfully",
      results: stores,
    });
  } catch (error) {
    console.log("Error in getAllStores controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      mesage: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findById(id);

    if (!store) {
      return res.status(apiStatus.NOT_FOUND).json({
        success: false,
        message: "Store not found",
      });
    }

    const { error, data } = updateStoreSchema.safeParse(req.body);

    if (error) {
      return res.staus(apiStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }

    const { name, description, location, phone, email, image } = data;

    const newStore = await Store.findByIdAndUpdate(
      id,
      {
        name,
        description,
        location,
        phone,
        email,
        image,
      },
      { new: true }
    );

    return res.status(apiStatus.OK).json({
      success: true,
      message: "Store updated successfully",
      results: newStore,
    });
  } catch (error) {
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findByIdAndDelete(id);

    if (!store) {
      return res.status(apiStatus.NOT_FOUND).json({
        success: false,
        message: "Store not found",
      });
    }

    return res.status(apiStatus.OK).json({
      success: true,
      message: "Store deleted successfully",
    });
  } catch (error) {
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
