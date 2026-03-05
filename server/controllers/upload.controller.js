import { uploadToCloudinary } from "../libs/cloudinary.js";
import { apiStatus } from "../constants/apiStatus.js";
import { errorMessage } from "../constants/errorMessage.js";

export const uploadCategoryImage = async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file, "tulos/categories");

    return res.json({
      success: true,
      image: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};
