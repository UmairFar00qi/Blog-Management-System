import { useEffect, useState } from "react";
import API from "../services/api";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("recent");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/admin/blogs");
      setBlogs(res.data);
    } catch (error) {
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) return;
    try {
      await API.delete(`/admin/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id)); // Optimistic UI update
    } catch (error) {
      alert("Delete failed");
    }
  };

  const toggleStatus = async (id) => {
    try {
      await API.put(`/admin/blogs/${id}/status`);
      fetchBlogs(); // Refresh to get updated status
    } catch (error) {
      alert("Update status failed");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const blogDate = new Date(blog.createdAt);
    const today = new Date();

    if (filter === "today") {
      return blogDate.toDateString() === today.toDateString();
    }
    if (filter === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      return blogDate.toDateString() === yesterday.toDateString();
    }
    return true; // "recent"
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .admin-blogs-container {
          font-family: 'Inter', sans-serif;
          color: #0f172a;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .header-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Filter Pills */
        .filter-bar {
          display: flex;
          gap: 8px;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 8px;
        }

        .filter-pill {
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #64748b;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-pill:hover {
          color: #0f172a;
        }

        .filter-pill.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* Grid Layout */
        .admin-blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* Blog Card */
        .admin-card {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .admin-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .card-image-container {
          height: 160px;
          width: 100%;
          position: relative;
          background: #f1f5f9;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Floating Status Badge */
        .status-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .status-published {
          background: rgba(16, 185, 129, 0.9);
          color: #ffffff;
        }

        .status-hidden {
          background: rgba(239, 68, 68, 0.9);
          color: #ffffff;
        }

        .card-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-meta {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 8px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-desc {
          font-size: 14px;
          color: #475569;
          margin: 0 0 16px 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        /* Action Buttons */
        .card-actions {
          display: flex;
          gap: 12px;
          margin-top: auto;
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
        }

        .btn-action {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-update {
          background: #eff6ff;
          color: #3b82f6;
          border: 1px solid transparent;
        }

        .btn-update:hover {
          background: #dbebfe;
        }

        .btn-delete {
          background: #ffffff;
          color: #ef4444;
          border: 1px solid #fecaca;
        }

        .btn-delete:hover {
          background: #fef2f2;
          border-color: #ef4444;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: #ffffff;
          border-radius: 12px;
          border: 1px dashed #cbd5e1;
        }

        /* Skeleton */
        .skeleton {
          background: #e2e8f0;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>

      <div className="admin-blogs-container">
        
        <div className="header-section">
          <h1 className="header-title">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6' }}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Manage Blogs
          </h1>

          <div className="filter-bar">
            {["recent", "today", "yesterday"].map((f) => (
              <button
                key={f}
                className={`filter-pill ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          /* Skeleton Loaders */
          <div className="admin-blog-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="admin-card" style={{ height: "340px" }}>
                <div className="skeleton" style={{ height: "160px", width: "100%", borderRadius: "0" }}></div>
                <div style={{ padding: "16px" }}>
                  <div className="skeleton" style={{ height: "12px", width: "40%", marginBottom: "12px" }}></div>
                  <div className="skeleton" style={{ height: "20px", width: "90%", marginBottom: "8px" }}></div>
                  <div className="skeleton" style={{ height: "16px", width: "100%", marginBottom: "24px" }}></div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                    <div className="skeleton" style={{ height: "36px", flex: 1 }}></div>
                    <div className="skeleton" style={{ height: "36px", flex: 1 }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          /* Actual Blog Cards */
          <div className="admin-blog-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="admin-card">
                
                <div className="card-image-container">
                  {/* Floating Status Badge */}
                  <div className={`status-badge ${blog.status === "published" ? "status-published" : "status-hidden"}`}>
                    {blog.status === "published" ? "✓ Published" : "👁 Hidden"}
                  </div>

                  {blog.image ? (
                    <img
                      src={
                        blog.image.startsWith("uploads/")
                          ? `http://localhost:5000/${blog.image}`
                          : `http://localhost:5000/uploads/${blog.image}`
                      }
                      alt={blog.title}
                      className="card-image"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x160?text=Image+Not+Found" }}
                    />
                  ) : (
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "14px" }}>
                      No Image
                    </div>
                  )}
                </div>

                <div className="card-content">
                  <div className="card-meta">
                    <span style={{ fontWeight: 500, color: "#475569" }}>{blog.author?.name || "Unknown"}</span>
                    {" • "}
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>

                  <h2 className="card-title" title={blog.title}>{blog.title}</h2>
                  <p className="card-desc">{blog.description || "No description provided."}</p>

                  <div className="card-actions">
                    <button 
                      onClick={() => toggleStatus(blog._id)} 
                      className="btn-action btn-update"
                      title={blog.status === "published" ? "Hide Blog" : "Publish Blog"}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      {blog.status === "published" ? "Hide" : "Publish"}
                    </button>
                    
                    <button 
                      onClick={() => deleteBlog(blog._id)} 
                      className="btn-action btn-delete"
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state">
            <svg width="48" height="48" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <h3 style={{ fontSize: "18px", color: "#0f172a", margin: "0 0 8px 0" }}>No Blogs Found</h3>
            <p style={{ color: "#64748b", margin: 0 }}>There are no blogs matching the "{filter}" filter.</p>
          </div>
        )}
      </div>
    </>
  );
}