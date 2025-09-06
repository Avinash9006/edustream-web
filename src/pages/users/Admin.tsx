import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../api/endpoints";

interface User {
  _id: string;
  email: string;
  name: string;
  status: string;
  role: "anonymous" | "student" | "teacher" | "admin";
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(endpoints.users, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const currentUserId = JSON.parse(atob(token.split(".")[1])).userId;
        setUsers(res.data.users.filter((u: User) => u._id !== currentUserId));
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Update role and auto-approve if not anonymous
  const updateRole = async (userId: string, role: User["role"]) => {
    if (!token) return;

    try {
      await axios.post(`${endpoints.assignRole}`, { userId, role }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(prev =>
        prev.map(u =>
          u._id === userId
            ? { ...u, role, status: role !== "anonymous" ? 'pending' : 'approved' }
            : u
        )
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${endpoints.users}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const generateInvite = async () => {
    if (!token) return;
    try {
      const res = await axios.get(endpoints.generateInvite, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInviteLink(res.data.inviteLink);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to generate invite link");
    }
  };

  if (loading) return <div className="text-center py-10">Loading users...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      {/* Invite Link Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Invite New User</h3>
        <button
          onClick={generateInvite}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Invite Link
        </button>
        {inviteLink && (
          <div className="mt-2 p-2 bg-gray-100 rounded break-all flex items-center justify-between">
            <span>{inviteLink}</span>
            <button
              onClick={() => navigator.clipboard.writeText(inviteLink)}
              className="ml-2 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
            >
              Copy
            </button>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Role</th>
              <th className="px-6 py-3 text-left font-semibold">Approved</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={e => updateRole(user._id, e.target.value as User["role"])}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="anonymous">Anonymous</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">{user.status === 'approved' ? "Yes" : "No"}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
