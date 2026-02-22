import { useState, useRef } from "react";
import API from "../services/api";

export default function UploadBlog() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const formRef = useRef(null);

  // Jab user file select kare toh uska preview dikhane ke liye
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.target);

    try {
      await API.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMsg("🎉 Blog published successfully!");
      formRef.current.reset();
      setImagePreview(null); // Preview hatane ke liye
      
      // 3 seconds baad success message gayab kar dein
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .upload-container {
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        .header-title {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        .upload-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          padding: 32px;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }

        .modern-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background: #f8fafc;
          font-family: inherit;
          font-size: 15px;
          color: #0f172a;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .modern-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .modern-input::placeholder {
          color: #94a3b8;
        }

        textarea.modern-input {
          resize: vertical;
          min-height: 120px;
        }

        /* Custom File Upload Area */
        .file-upload-wrapper {
          position: relative;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          background: #f8fafc;
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .file-upload-wrapper:hover {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .upload-icon {
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .file-upload-wrapper:hover .upload-icon {
          color: #3b82f6;
        }

        .preview-image {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 8px;
          margin-top: 16px;
          border: 1px solid #e2e8f0;
        }

        /* Action Button */
        .btn-submit {
          width: 100%;
          padding: 16px;
          background: #0f172a;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .btn-submit:hover:not(:disabled) {
          background: #1e293b;
        }

        .btn-submit:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        /* Messages */
        .alert {
          padding: 14px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .alert-error {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        .alert-success {
          background: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }
      `}</style>

      <div className="upload-container">
        <h1 className="header-title">
          <svg width="28" height="28" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-8m0 0l-4 4m4-4l4 4m6-4a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Create New Blog
        </h1>
        <p className="header-subtitle">Write your thoughts and share them with the world.</p>

        <form ref={formRef} onSubmit={submitHandler} className="upload-card">
          
          {/* Messages */}
          {errorMsg && (
            <div className="alert alert-error">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              {successMsg}
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Blog Title</label>
            <input
              name="title"
              placeholder="e.g. 10 Tips for Modern Web Design"
              className="modern-input"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Description / Content</label>
            <textarea
              name="description"
              placeholder="Write your blog content here..."
              className="modern-input"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Tags</label>
            <input
              name="tags"
              placeholder="e.g. Technology, React, Design (comma separated)"
              className="modern-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Cover Image</label>
            
            <div className="file-upload-wrapper">
              <input
                type="file"
                name="image"
                className="file-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="upload-icon">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <p style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#334155" }}>
                Click to upload or drag and drop
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>

            {/* 🔥 Live Image Preview */}
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="preview-image" />
            )}
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? (
              <>
                <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Publishing...
              </>
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>
      </div>
    </>
  );
}