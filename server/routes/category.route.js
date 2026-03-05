import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.put("/:slug", updateCategory);
router.delete("/:slug", deleteCategory);

export default router;
