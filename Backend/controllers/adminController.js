import User from "../models/User.js";
import Blog from "../models/Blog.js"; // assume aapka Blog model ye file me import hai

// =======================
// User Controllers
// =======================

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER ROLE
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // validate role
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Blog Controllers (Admin)
// =======================

// GET ALL BLOGS (Admin)
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "-password");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE A BLOG
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TOGGLE BLOG STATUS (e.g., publish/unpublish)
export const toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.published = !blog.published; // toggle status
    await blog.save();
    res.json({ message: "Blog status updated", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
