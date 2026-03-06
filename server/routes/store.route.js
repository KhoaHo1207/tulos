import mongoose from "mongoose";
import {
  createStore,
  getAllStores,
  updateStore,
  deleteStore,
} from "../controllers/store.controller.js";

import { Router } from "express";

const router = Router();

router.post("/", createStore);
router.get("/", getAllStores);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);
