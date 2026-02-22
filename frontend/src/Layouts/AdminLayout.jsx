import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      {/* Top Navbar */}
      <Navbar />

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            marginLeft: "250px", // ✅ space for sidebar
            padding: "24px",
            background: "#f9fafb",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "12px",
              padding: "24px",
              minHeight: "calc(100vh - 150px)", // ✅ ensures footer space
            }}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
