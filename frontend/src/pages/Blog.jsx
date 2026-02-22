import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("recent");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id) => {
    // useNavigate hook use karna better hai window.location.href se React mein
    navigate(`/admin/update-blog/${id}`);
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

    return true; // "recent" or default
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .page-container {
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: 'Inter', sans-serif;
          padding: 40px 24px;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-section {
          margin-bottom: 40px;
          text-align: center;
        }

        .header-section h1 {
          font-size: 36px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .header-section p {
          color: #64748b;
          font-size: 16px;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Filter Tabs */
        .filter-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 24px;
          border-radius: 30px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #475569;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .filter-btn.active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
          box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.2);
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 32px;
        }

        /* Blog Card */
        .blog-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
        }

        .card-image-wrapper {
          width: 100%;
          height: 200px;
          background: #e2e8f0;
          position: relative;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .blog-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-content {
          padding: 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-meta {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 12px 0;
          line-height: 1.4;
          /* Line clamping for title */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-desc {
          font-size: 15px;
          color: #475569;
          margin: 0 0 20px 0;
          line-height: 1.6;
          /* Line clamping for description */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .tag-pill {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .card-actions {
          margin-top: auto;
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
        }

        .btn-primary {
          width: 100%;
          padding: 12px;
          background: #f8fafc;
          color: #0f172a;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px dashed #cbd5e1;
          grid-column: 1 / -1;
        }

        /* Skeleton Loading */
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

      <div className="page-container">
        <div className="content-wrapper">
          
          <div className="header-section">
            <h1>Discover Our Blogs</h1>
            <p>Read our latest articles, insights, and stories directly from the community.</p>
          </div>

          {/* Filters */}
          <div className="filter-container">
            {["recent", "today", "yesterday"].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="blog-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="blog-card" style={{ height: "450px" }}>
                  <div className="skeleton" style={{ width: "100%", height: "200px", borderRadius: "16px 16px 0 0" }}></div>
                  <div className="card-content">
                    <div className="skeleton" style={{ width: "40%", height: "14px", marginBottom: "16px" }}></div>
                    <div className="skeleton" style={{ width: "90%", height: "24px", marginBottom: "8px" }}></div>
                    <div className="skeleton" style={{ width: "60%", height: "24px", marginBottom: "20px" }}></div>
                    <div className="skeleton" style={{ width: "100%", height: "14px", marginBottom: "8px" }}></div>
                    <div className="skeleton" style={{ width: "80%", height: "14px", marginBottom: "auto" }}></div>
                    <div className="skeleton" style={{ width: "100%", height: "40px", marginTop: "20px", borderRadius: "8px" }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Blog Grid */
            <div className="blog-grid">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <div key={blog._id} className="blog-card">
                    
                    <div className="card-image-wrapper">
                      {blog.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${blog.image}`}
                          alt={blog.title}
                          className="card-image"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
                          No Image Available
                        </div>
                      )}
                    </div>

                    <div className="card-content">
                      <div className="card-meta">
                        <span style={{ fontWeight: 600, color: "#0f172a" }}>{blog.author?.name || "Anonymous"}</span>
                        <span>•</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <h2 className="card-title" title={blog.title}>{blog.title}</h2>
                      
                      <p className="card-desc">{blog.description}</p>

                      <div className="tags-container">
                        {blog.tags?.slice(0, 3).map((tag, i) => (
                          <span key={i} className="tag-pill">#{tag}</span>
                        ))}
                        {blog.tags?.length > 3 && (
                          <span className="tag-pill">+{blog.tags.length - 3}</span>
                        )}
                      </div>

                      <div className="card-actions">
                        <button 
                          onClick={() => handleUpdate(blog._id)} 
                          className="btn-primary"
                        >
                          Read Full Articles
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                /* Empty State Message */
                <div className="empty-state">
                  <h3 style={{ fontSize: "20px", color: "#0f172a", marginBottom: "8px" }}>No blogs found</h3>
                  <p style={{ color: "#64748b" }}>We couldn't find any blogs matching your current filter.</p>
                  <button 
                    onClick={() => setFilter("recent")}
                    style={{ marginTop: "16px", padding: "8px 16px", background: "none", border: "1px solid #0f172a", borderRadius: "6px", cursor: "pointer", fontWeight: 500 }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}