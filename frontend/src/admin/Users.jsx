import { useEffect, useState } from "react";
import API from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      setErrorMsg("Failed to load users. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";
    
    // 🔥 Optimistic Update: Fauran UI change karein bina API ka wait kiye
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      )
    );

    try {
      await API.put(
        `/admin/users/${id}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      // Agar API fail ho jaye, toh wapas purana data fetch kar lein
      setErrorMsg("Failed to update role. Changes reverted.");
      fetchUsers();
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  // Helper function to get initials (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .users-container {
          font-family: 'Inter', sans-serif;
          color: #0f172a;
          padding-bottom: 40px;
        }

        .header-section {
          margin-bottom: 24px;
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
          margin: 0;
        }

        /* Table Wrapper */
        .table-wrapper {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          width: 100%;
          overflow-x: auto;
        }

        /* Modern Table */
        .modern-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .modern-table th {
          background: #f8fafc;
          padding: 16px 20px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e2e8f0;
        }

        .modern-table td {
          padding: 16px 20px;
          font-size: 14px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .modern-table tbody tr {
          transition: background 0.2s ease;
        }

        .modern-table tbody tr:hover {
          background: #f8fafc;
        }

        .modern-table tbody tr:last-child td {
          border-bottom: none;
        }

        /* User Info Column */
        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        .user-name {
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 2px 0;
        }

        .user-email {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        /* Role Badges */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge-admin {
          background: #f3e8ff;
          color: #7e22ce;
        }

        .badge-user {
          background: #f1f5f9;
          color: #475569;
        }

        /* Action Buttons */
        .btn-action {
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        .btn-make-admin {
          background: #ecfdf5;
          color: #059669;
        }
        .btn-make-admin:hover {
          background: #d1fae5;
        }

        .btn-remove-admin {
          background: #fef2f2;
          color: #dc2626;
        }
        .btn-remove-admin:hover {
          background: #fee2e2;
        }

        /* Alert Message */
        .alert-error {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Skeleton Table Rows */
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

      <div className="users-container">
        <div className="header-section">
          <h1 className="header-title">
            <svg width="28" height="28" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            User Management
          </h1>
          <p className="header-subtitle">View and manage roles for all registered users.</p>
        </div>

        {errorMsg && (
          <div className="alert-error">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {errorMsg}
          </div>
        )}

        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                /* 🔥 Skeleton Loading Rows */
                [1, 2, 3, 4, 5].map((n) => (
                  <tr key={n}>
                    <td>
                      <div className="user-info">
                        <div className="skeleton" style={{ width: "40px", height: "40px", borderRadius: "50%" }}></div>
                        <div>
                          <div className="skeleton" style={{ width: "120px", height: "14px", marginBottom: "6px" }}></div>
                          <div className="skeleton" style={{ width: "160px", height: "12px" }}></div>
                        </div>
                      </div>
                    </td>
                    <td><div className="skeleton" style={{ width: "80px", height: "24px", borderRadius: "20px" }}></div></td>
                    <td><div className="skeleton" style={{ width: "100px", height: "32px", borderRadius: "6px" }}></div></td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                /* 🚀 Actual Data Rows */
                users.map((user) => (
                  <tr key={user._id}>
                    
                    {/* Column 1: Avatar + Name + Email combined */}
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="user-name">{user.name}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Role Badge */}
                    <td>
                      <span className={`badge ${user.role === "admin" ? "badge-admin" : "badge-user"}`}>
                        {user.role === "admin" ? (
                          <>
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            Admin
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            User
                          </>
                        )}
                      </span>
                    </td>

                    {/* Column 3: Actions */}
                    <td>
                      {user.role === "user" ? (
                        <button
                          onClick={() => changeRole(user._id, user.role)}
                          className="btn-action btn-make-admin"
                        >
                          Promote to Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => changeRole(user._id, user.role)}
                          className="btn-action btn-remove-admin"
                        >
                          Revoke Admin
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                /* Empty State */
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}