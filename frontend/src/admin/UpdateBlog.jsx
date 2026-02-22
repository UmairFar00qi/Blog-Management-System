import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function UpdateBlog() {
  const { id } = useParams(); // blog id from URL
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    tags: "",
    status: "published",
  });

  // Fetch single blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/admin/blogs/${id}`);
        const data = res.data;
        setBlog({
          title: data.title || "",
          description: data.description || "",
          tags: data.tags ? data.tags.join(",") : "",
          status: data.status || "published",
        });
      } catch (error) {
        console.log("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/blogs/${id}`, {
        title: blog.title,
        description: blog.description,
        tags: blog.tags.split(",").map((t) => t.trim()),
        status: blog.status,
      });
      alert("Blog updated successfully");
      navigate("/admin/blogs"); // back to AllBlogs page
    } catch (error) {
      alert("Failed to update blog");
      console.log("Update error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={blog.description}
          onChange={handleChange}
          placeholder="Blog Description"
          className="border p-2 rounded"
          rows="5"
        />
        <input
          type="text"
          name="tags"
          value={blog.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={blog.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
