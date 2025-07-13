import express from "express";
import { getAllUserUrlsController } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/urls", authMiddleware, getAllUserUrlsController);

export default router;