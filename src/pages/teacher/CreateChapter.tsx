import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { endpoints } from "../../api/endpoints";

export default function CreateChapter() {
  const { subjectId, courseId } = useParams<{ subjectId: string,courseId:string }>();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${endpoints.courses}/${courseId}/subjects/${subjectId}/chapters`,
        { title, videoUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/subject/${subjectId}`);
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Add Chapter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
