import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../api/endpoints";


export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.users, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err));
  }, []);

  const updateRole = (userId: string, role: string) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        endpoints.assignRole,
        { userId, role },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role } : u))
        );
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-6 py-4 text-sm text-gray-800">{u.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{u.role}</td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => updateRole(u._id, e.target.value)}
                    className="border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
