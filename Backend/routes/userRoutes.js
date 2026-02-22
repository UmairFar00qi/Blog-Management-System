import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllUsers);

export default router;
