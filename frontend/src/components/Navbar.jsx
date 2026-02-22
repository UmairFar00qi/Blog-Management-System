import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaGlobe, FaTachometerAlt, FaUpload, FaUsers, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* Main Navbar Container */
        .top-navbar {
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 40; /* Sidebar ka z-index 50 hai, isliye ye uske peeche rahega agar overlap ho */
          margin-left: 250px; /* 🔥 Sidebar ki jagah chhorne ke liye */
          transition: margin-left 0.3s ease;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .navbar-brand {
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        /* Desktop Actions */
        .desktop-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-outline {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          background: #f8fafc;
          color: #475569;
          border: 1px solid #cbd5e1;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .btn-outline:hover {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #94a3b8;
        }

        .btn-danger {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .btn-danger:hover {
          background: #fee2e2;
          color: #b91c1c;
          border-color: #fca5a5;
        }

        /* Hamburger Button */
        .hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          color: #0f172a;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }

        /* Mobile Dropdown Menu */
        .mobile-menu {
          display: none;
          position: absolute;
          top: 70px;
          right: 24px;
          width: 240px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 12px;
          flex-direction: column;
          gap: 4px;
          z-index: 50;
        }

        .mobile-menu.open {
          display: flex;
          animation: slideDown 0.3s ease forwards;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          color: #475569;
          font-size: 15px;
          font-weight: 500;
          transition: background 0.2s ease;
        }

        .mobile-link:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .mobile-link-danger {
          color: #dc2626;
        }
        .mobile-link-danger:hover {
          background: #fef2f2;
          color: #b91c1c;
        }

        /* Animations & Responsiveness */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .top-navbar {
            margin-left: 0; /* 🔥 Mobile par full width */
            padding: 16px 20px;
          }
          .desktop-actions {
            display: none;
          }
          .hamburger-btn {
            display: block;
          }
        }
      `}</style>

      <nav className="top-navbar">
        {/* Left Side: Brand/Title */}
        <h1 className="navbar-brand">
          <span style={{ color: '#64748b', fontWeight: 400 }}>Workspace /</span> Dashboard
        </h1>

        {/* Right Side: Desktop Actions */}
        <div className="desktop-actions">
          <Link to="/blogs" className="btn-outline">
            <FaGlobe /> View Public Site
          </Link>
          <button onClick={handleLogout} className="btn-outline btn-danger">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Dropdown Menu (Contains everything because Sidebar hides on mobile) */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <div style={{ padding: "0 12px 8px 12px", marginBottom: "8px", borderBottom: "1px solid #f1f5f9", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase" }}>
            Menu
          </div>
          <Link to="/admin/dashboard" className="mobile-link" onClick={() => setIsOpen(false)}>
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/admin/blogs" className="mobile-link" onClick={() => setIsOpen(false)}>
            <FaGlobe /> Manage Blogs
          </Link>
          <Link to="/admin/upload" className="mobile-link" onClick={() => setIsOpen(false)}>
            <FaUpload /> Upload Blog
          </Link>
          <Link to="/admin/users" className="mobile-link" onClick={() => setIsOpen(false)}>
            <FaUsers /> Users
          </Link>
          <Link to="/blogs" className="mobile-link" onClick={() => setIsOpen(false)}>
            <FaGlobe /> View Public Site
          </Link>
          
          <div style={{ height: "1px", background: "#f1f5f9", margin: "8px 0" }}></div>
          
          <button onClick={handleLogout} className="mobile-link mobile-link-danger" style={{ border: "none", background: "transparent", width: "100%", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>
    </>
  );
}