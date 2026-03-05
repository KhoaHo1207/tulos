import express from "express";
import { uploadCategoryImage } from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/category-image", upload.single("image"), uploadCategoryImage);

export default router;
