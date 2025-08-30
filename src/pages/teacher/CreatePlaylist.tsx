import { useState } from "react";
import axios from "axios";
import { endpoints } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function CreatePlaylist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        endpoints.courses,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Playlist created successfully!");
      navigate("/playlist"); // go back to list of courses
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create playlist");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create a New Playlist</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreate}
          className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
}
