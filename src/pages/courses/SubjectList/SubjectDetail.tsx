import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../api/endpoints";

export default function SubjectDetail() {
  const { courseId, subjectId } = useParams<{ courseId: string; subjectId: string }>();
  const [subject, setSubject] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [editingChapter, setEditingChapter] = useState<any>(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const fetchData = () => {
    // Fetch subject details
    axios
      .get(`${endpoints.courses}/${courseId}/subjects/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSubject(res.data))
      .catch((err) => console.error("Error fetching subject", err));

    // Fetch chapters
    axios
      .get(`${endpoints.courses}/${courseId}/subjects/${subjectId}/chapters`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChapters(res.data.chapters))
      .catch((err) => console.error("Error fetching chapters", err));
  };

  useEffect(() => {
    fetchData();
  }, [courseId, subjectId]);

  const handleUpdateChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChapter) return;

    try {
      await axios.put(
        `${endpoints.courses}/${courseId}/subjects/${subjectId}/chapters/${editingChapter._id}`,
        editingChapter,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingChapter(null);
      fetchData();
    } catch (err) {
      console.error("Error updating chapter", err);
      alert("Failed to update chapter");
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    if (!window.confirm("Are you sure you want to delete this chapter?")) return;

    try {
      await axios.delete(
        `${endpoints.courses}/${courseId}/subjects/${subjectId}/chapters/${chapterId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error("Error deleting chapter", err);
      alert("Failed to delete chapter");
    }
  };

  if (!subject) return <p className="text-center py-6">Loading subject...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{subject.title}</h1>
      <p className="text-gray-600 mb-8">{subject.description}</p>

      {/* Chapters header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Chapters</h2>
        {(user.role === "teacher" || user.role === "admin") && (
          <button
            onClick={() =>
              navigate(`/courses/${courseId}/subjects/${subjectId}/add-chapter`, {
                state: { courseId, subjectId },
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Chapter
          </button>
        )}
      </div>

      {/* Edit chapter form */}
      {editingChapter && (
        <form
          onSubmit={handleUpdateChapter}
          className="mb-6 bg-yellow-50 border p-4 rounded-lg space-y-3"
        >
          <input
            type="text"
            placeholder="Chapter Title"
            value={editingChapter.title}
            onChange={(e) =>
              setEditingChapter({ ...editingChapter, title: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Chapter Description"
            value={editingChapter.description}
            onChange={(e) =>
              setEditingChapter({ ...editingChapter, description: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditingChapter(null)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Chapters grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <div
            key={chapter._id}
            className="border rounded-xl shadow hover:shadow-lg transition bg-white p-4 flex flex-col justify-between"
          >
            <Link
              to={`/courses/${courseId}/subjects/${subjectId}/chapterVideos/${chapter._id}`}
              className="flex-1"
            >
              <h3 className="text-lg font-bold">{chapter.title}</h3>
            </Link>

            {(user.role === "teacher" || user.role === "admin") && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditingChapter(chapter)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteChapter(chapter._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
