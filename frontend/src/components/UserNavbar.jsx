import { Link, useNavigate } from "react-router-dom";
import { FaBlog, FaSignOutAlt } from "react-icons/fa"; // FontAwesome icons

export default function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontFamily: "'Poppins', sans-serif",
    padding: "10px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
  };

  const linkHover = (e) => {
    e.target.style.background = "rgba(255,255,255,0.2)";
    e.target.style.transform = "scale(1.05)";
  };

  const linkLeave = (e) => {
    e.target.style.background = "transparent";
    e.target.style.transform = "scale(1)";
  };

  return (
    <nav
      style={{
        background: "#5f22c1",
        color: "white",
        padding: "12px 24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <h1 style={{ fontSize: "22px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaBlog /> Blog Management
        </h1>

        {/* Links */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Link
            to="/blogs"
            style={linkStyle}
            onMouseEnter={linkHover}
            onMouseLeave={linkLeave}
          >
            <FaBlog /> Blogs
          </Link>

          <button
            onClick={handleLogout}
            style={{
              ...linkStyle,
              border: "1px solid white",
              background: "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#5f22c1";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "white";
              e.target.style.transform = "scale(1)";
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
