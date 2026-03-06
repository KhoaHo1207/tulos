import express from "express";
import {
  createType,
  getAllTypes,
  updateType,
  deleteType,
} from "../controllers/type.controller.js";

const router = express.Router();

router.post("/", createType);
router.get("/", getAllTypes);
router.put("/:id", updateType);
router.delete("/:id", deleteType);

export default router;
