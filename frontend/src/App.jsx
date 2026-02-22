import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Blogs from "./pages/Blog";
import Dashboard from "./admin/Dashboard";
import UploadBlog from "./admin/UploadBlog";
import Users from "./admin/Users";
import AllBlogs from "./admin/AllBlogs"; 
import AdminRoute from "./components/AdminRoute";
import UpdateBlog from "./admin/UpdateBlog";
import { jwtDecode } from "jwt-decode";

// ✅ Import Layouts
import Navbar from "./components/Navbar"; // admin navbar
import UserNavbar from "./components/UserNavbar"; // user navbar
import Footer from "./components/Footer";
import AdminLayout from "./layouts/AdminLayout"; // admin layout


function UserLayout({ children }) {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.log("Token decode error:", err);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {role === "admin" ? <Navbar /> : <UserNavbar />}   {/* ✅ role check */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      console.log("Decoded token:", jwtDecode(token));
    } catch (err) {
      console.log("Token decode error:", err);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Auth (no layout) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User Pages (Navbar depends on role + Footer) */}
        <Route path="/blogs" element={<UserLayout><Blogs /></UserLayout>} />

        {/* Admin Pages (AdminNavbar + Sidebar + Footer) */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <AdminRoute>
              <AdminLayout>
                <UploadBlog />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <AdminRoute>
              <AdminLayout>
                <AllBlogs />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-blog/:id"
          element={
            <AdminRoute>
              <AdminLayout>
                <UpdateBlog />
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
