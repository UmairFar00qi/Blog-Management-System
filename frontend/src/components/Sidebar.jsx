import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBlog, FaUpload, FaUsers, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logic here (e.g., removing token)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #0f172a; /* Premium Dark Navy */
          color: #f8fafc;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          z-index: 50;
          border-right: 1px solid #1e293b;
          transition: transform 0.3s ease-in-out;
        }

        .sidebar-header {
          padding: 32px 24px 24px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
          color: white;
        }

        .sidebar-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.5px;
          color: #ffffff;
        }

        .nav-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 16px;
          margin-top: 16px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 8px;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.2s ease;
          position: relative;
        }

        /* Hover Effect */
        .nav-item:hover {
          background-color: rgba(30, 41, 59, 0.5);
          color: #f8fafc;
          transform: translateX(4px);
        }

        /* Active State */
        .nav-item.active {
          background-color: #1e293b;
          color: #3b82f6; /* Modern Blue text */
          transform: translateX(0);
        }

        /* The Left Blue Indicator Line */
        .nav-item.active::before {
          content: "";
          position: absolute;
          left: -16px; /* Touches the left edge of sidebar */
          top: 10%;
          height: 80%;
          width: 4px;
          background-color: #3b82f6;
          border-radius: 0 4px 4px 0;
        }

        /* Icon styling */
        .nav-icon {
          font-size: 18px;
        }

        .sidebar-footer {
          padding: 24px 16px;
          border-top: 1px solid #1e293b;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          background: transparent;
          color: #ef4444; /* Soft Red */
          border: none;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        /* 🔥 Hide Sidebar on smaller screens (Tablets/Mobiles) */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }
        }
      `}</style>

      <aside className="sidebar">
        
        {/* Header / Logo Area */}
        <div className="sidebar-header">
          <div className="logo-icon">B</div>
          <h2 className="sidebar-title">Admin Panel</h2>
        </div>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <Link
            to="/admin/dashboard"
            className={`nav-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
          >
            <FaTachometerAlt className="nav-icon" /> Dashboard
          </Link>

          <Link
            to="/admin/blogs"
            className={`nav-item ${location.pathname === "/admin/blogs" ? "active" : ""}`}
          >
            <FaBlog className="nav-icon" /> All Blogs
          </Link>

          <Link
            to="/admin/upload"
            className={`nav-item ${location.pathname === "/admin/upload" ? "active" : ""}`}
          >
            <FaUpload className="nav-icon" /> Upload Blog
          </Link>

          <Link
            to="/admin/users"
            className={`nav-item ${location.pathname === "/admin/users" ? "active" : ""}`}
          >
            <FaUsers className="nav-icon" /> Users
          </Link>
        </nav>

        {/* Bottom Section (Logout) */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="nav-icon" /> Logout
          </button>
        </div>

      </aside>
    </>
  );
}