import { useState, useEffect } from "react";
import axios from "axios";
import { endpoints } from "../../api/endpoints";

export default function Profile() {
  const [user, setUser] = useState<any>({});
  const [activeTab, setActiveTab] = useState<"details" | "achievements">("details");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.profile, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data.user))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Top profile card */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-md">
        {/* Profile image/logo */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500">
          <img
            src={user.profileImage || "/default-profile.png"}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Basic info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.designation || "Student"}</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="text-gray-500 text-sm">Role: {user.role}</p>
        </div>

        {/* Edit button */}
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Edit
        </button>
      </div>

      {/* Tabs */}
<div className="mt-6 border-b border-gray-200">
  <ul className="flex space-x-6">
    <li
      onClick={() => setActiveTab("details")}
      className={`cursor-pointer py-2 px-3 font-medium ${
        activeTab === "details"
          ? "border-b-2 border-purple-600 text-purple-600"
          : "text-gray-500"
      }`}
    >
      Details
    </li>
    <li
      onClick={() => setActiveTab("achievements")}
      className={`cursor-pointer py-2 px-3 font-medium ${
        activeTab === "achievements"
          ? "border-b-2 border-purple-600 text-purple-600"
          : "text-gray-500"
      }`}
    >
      Achievements
    </li>
  </ul>
</div>


      {/* Tab content */}
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
        {activeTab === "details" && (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Designation:</strong> {user.designation || "N/A"}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}
        {activeTab === "achievements" && (
          <div>
            {user.achievements?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {user.achievements.map((ach: string, idx: number) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No achievements yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
