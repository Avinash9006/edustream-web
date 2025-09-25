import AchievementForm from "./AchievementForm"; // import above form
import { useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api/endpoints";

export default function ProfileAchievements({ user, setUser }: any) {
  const [editing, setEditing] = useState<null | any>(null); // achievement being edited
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (ach: any) => {
    setEditing(ach);
    setShowForm(true);
  };

  const handleDelete = async (ach: any) => {
    // if (!confirm("Are you sure you want to delete this achievement?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${endpoints.profile}/achievements/${ach._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // remove from local state
      setUser((prev: any) => ({
        ...prev,
        achievements: prev.achievements.filter((a: any) => a._id !== ach._id),
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete achievement");
    }
  };

  const handleSave = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      let updatedAchievement:any;
      if (editing) {
        // Edit existing achievement
        const res = await axios.put(
          `${endpoints.profile}/achievements/${editing._id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        updatedAchievement = res.data.achievement;
        setUser(res.data.user);
      } else {
        // Add new achievement
        const res = await axios.put(`${endpoints.profile}/achievements`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        updatedAchievement = res.data.achievement;
        setUser(res.data.user);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save achievement");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          + Add
        </button>
      </div>

      {user.achievements?.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {user.achievements.map((ach: any) => (
            <li key={ach._id} className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{ach.title}</span>
                {ach.type && <span className="ml-2 text-gray-600">({ach.type})</span>}
                {ach.date && (
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(ach.date).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(ach)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ach)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No achievements yet.</p>
      )}

      {showForm && (
        <AchievementForm
          initialData={editing || undefined}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
