import { apiStatus } from "../constants/apiStatus.js";
import { errorMessage } from "../constants/errorMessage.js";
import cloudinary from "../libs/cloudinary.js";
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(apiStatus.BAD_REQUEST).json({
        success: false,
        message: "File is required",
      });
    }
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "tulos",
      }
    );
    return res.status(apiStatus.OK).json({
      success: true,
      message: "Image uploaded successfully",
      results: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        resource_type: result.resource_type,
        created_at: result.created_at,
        tags: result.tags,
        bytes: result.bytes,
        type: result.type,
        etag: result.etag,
      },
    });
  } catch (error) {
    console.log("Error in uploadImage controller", error);
    return res.status(apiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: errorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
