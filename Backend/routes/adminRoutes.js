import express from "express";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();

// ✅ Admin Dashboard route
router.get("/dashboard", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: "published" });
    const hiddenBlogs = await Blog.countDocuments({ status: "hidden" });

    res.json({ totalUsers, totalBlogs, publishedBlogs, hiddenBlogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin Blogs route
router.get("/blogs", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete Blog route
router.delete("/blogs/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update Blog route
router.put("/blogs/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, tags, status } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, tags, status },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog updated successfully", blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin Users route
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("name email role"); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Update User Role route
router.put("/users/:id/role", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("name email role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Role updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
