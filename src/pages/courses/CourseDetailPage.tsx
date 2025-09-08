import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../api/endpoints";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [newSubject, setNewSubject] = useState({ title: "", description: "", image: "" });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const token = localStorage.getItem("token");

  const fetchCourse = () => {
    axios
      .get(`${endpoints.courses}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course", err));
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${endpoints.courses}/${courseId}/subjects`, newSubject, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setNewSubject({ title: "", description: "", image: "" });
        setShowForm(false);
        fetchCourse();
      })
      .catch((err) => {
        console.error("Error adding subject", err);
        alert("Failed to add subject");
      });
  };

  const handleUpdateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;

    axios
      .put(
        `${endpoints.courses}/${courseId}/subjects/${editingSubject._id}`,
        editingSubject,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setEditingSubject(null);
        fetchCourse();
      })
      .catch((err) => {
        console.error("Error updating subject", err);
        alert("Failed to update subject");
      });
  };

  const handleDeleteSubject = (subjectId: string) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    axios
      .delete(`${endpoints.courses}/${courseId}/subjects/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchCourse())
      .catch((err) => {
        console.error("Error deleting subject", err);
        alert("Failed to delete subject");
      });
  };

  if (!course) return <p className="text-center py-6">Loading course...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Course Info */}
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>

      {/* Subjects Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Subjects</h2>
        {(user.role === "teacher" || user.role === "admin") && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Subject
          </button>
        )}
      </div>

      {/* Add Subject Form */}
      {showForm && (
        <form
          onSubmit={handleAddSubject}
          className="mb-6 bg-gray-50 border p-4 rounded-lg space-y-3"
        >
          <input
            type="text"
            placeholder="Subject Title"
            value={newSubject.title}
            onChange={(e) => setNewSubject({ ...newSubject, title: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Subject Description"
            value={newSubject.description}
            onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={newSubject.image}
            onChange={(e) => setNewSubject({ ...newSubject, image: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Edit Subject Form */}
      {editingSubject && (
        <form
          onSubmit={handleUpdateSubject}
          className="mb-6 bg-yellow-50 border p-4 rounded-lg space-y-3"
        >
          <input
            type="text"
            placeholder="Subject Title"
            value={editingSubject.title}
            onChange={(e) => setEditingSubject({ ...editingSubject, title: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Subject Description"
            value={editingSubject.description}
            onChange={(e) =>
              setEditingSubject({ ...editingSubject, description: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editingSubject.image}
            onChange={(e) => setEditingSubject({ ...editingSubject, image: e.target.value })}
            className="w-full px-3 py-2 border rounded"
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
              onClick={() => setEditingSubject(null)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Subjects Grid */}
      {course.subjects?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {course.subjects.map((subject: any) => (
            <div
              key={subject._id}
              className="flex flex-col border rounded-xl shadow bg-white overflow-hidden"
            >
              <Link
                to={`/courses/${course._id}/subjects/${subject._id}`}
                className="h-40 bg-gray-100 flex items-center justify-center"
              >
                {subject.image ? (
                  <img
                    src={subject.image}
                    alt={subject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-lg font-semibold">
                    {subject.title}
                  </span>
                )}
              </Link>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-gray-900">{subject.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {subject.description || "No description available."}
                </p>

                {(user.role === "teacher" || user.role === "admin") && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setEditingSubject(subject)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSubject(subject._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic mt-4">No subjects available for this course.</p>
      )}
    </div>
  );
}
