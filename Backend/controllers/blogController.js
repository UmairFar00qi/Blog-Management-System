import Blog from "../models/Blog.js";

// CREATE BLOG (ADMIN)
export const createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const blog = await Blog.create({
      title,
      description,
      author: "Admin", // default
      tags: Array.isArray(tags) ? tags : tags ? tags.split(",").map(t => t.trim()) : [],
      image: req.file ? req.file.filename : "",
      status: "published",
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BLOGS (USER)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
