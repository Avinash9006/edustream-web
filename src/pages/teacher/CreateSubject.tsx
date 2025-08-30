import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { endpoints } from "../../api/endpoints";

export default function CreateSubject() {
  const { courseId } = useParams<{ courseId: string }>();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${endpoints.courses}/${courseId}/subjects`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.error("Error creating subject:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Add Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
