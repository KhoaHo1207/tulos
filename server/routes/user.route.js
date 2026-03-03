import express from "express";
import { getUser } from "../controllers/user.controller.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", checkAuth, getUser);

export default router;
