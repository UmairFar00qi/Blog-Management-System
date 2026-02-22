import express from "express";
import multer from "multer";
import { createBlog, getBlogs } from "../controllers/blogController.js";
import protect from "../middleware/authMiddleware.js"; // fix: import protect
import isAdmin from "../middleware/adminMiddleware.js"; // fix: import isAdmin

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// routes
router.post("/", protect, isAdmin, upload.single("image"), createBlog);
router.get("/", getBlogs);

export default router;
