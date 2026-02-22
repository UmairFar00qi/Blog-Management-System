import { useEffect, useState } from "react";
import API from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!window.confirm(`Change role to ${newRole}?`)) return;

    try {
      await API.put(`/admin/users/${id}`, { role: newRole });
      alert("Role updated successfully");
      fetchUsers(); // refresh list
    } catch (error) {
      alert(error.response?.data?.message || "Role update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Users Management System</h1>

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.role}</td>
              <td className="p-3 border">
                <button
                  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  onClick={() => changeRole(user._id, user.role)}
                >
                  Change Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}