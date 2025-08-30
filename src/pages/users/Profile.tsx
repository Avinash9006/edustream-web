import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../api/endpoints";

export default function Profile() {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.profile, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch(err => console.error(err));
  }, []);

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        endpoints.profile,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      alert("Profile updated");
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${endpoints.profile}/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold">Profile</h2>

      {/* Profile Info */}
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={updateProfile}
          className="bg-black-500 text-white px-4 py-2 rounded-md hover:bg-black-600 transition"
        >
          Update Profile
        </button>
      </div>

      {/* Change Password */}
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <div>
          <label className="block font-semibold mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={changePassword}
          className="bg-black-500 text-white px-4 py-2 rounded-md hover:bg-black-600 transition"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
