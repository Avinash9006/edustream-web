import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../api/endpoints";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [newSubject, setNewSubject] = useState({ title: "", description: "", image: "" });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchCourse = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${endpoints.courses}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course", err));
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post(
        `${endpoints.courses}/${id}/subjects`,
        newSubject,
        { headers: { Authorization: `Bearer ${token}` } }
      )
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

      {/* Subjects Grid */}
      {course.subjects?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {course.subjects.map((subject: any) => (
            <Link
              to={`/courses/${course._id}/subjects/${subject._id}`}
              key={subject._id}
              className="flex flex-col border rounded-xl shadow hover:shadow-lg transition bg-white overflow-hidden"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
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
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  {subject.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {subject.description || "No description available."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic mt-4">
          No subjects available for this course.
        </p>
      )}
    </div>
  );
}
