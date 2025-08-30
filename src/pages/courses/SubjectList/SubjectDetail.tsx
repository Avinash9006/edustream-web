import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../api/endpoints";

export default function SubjectDetail() {
  const { courseId, id } = useParams<{ courseId: string; id: string }>();
  const [subject, setSubject] = useState<any>(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${endpoints.courses}/${courseId}/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSubject(res.data))
      .catch((err) => console.error("Error fetching subject", err));
  }, [courseId, id]);

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
              navigate(`/courses/${courseId}/subjects/${id}/add-chapter`, {
                state: { courseId, subjectId: id },
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Chapter
          </button>
        )}
      </div>

      {/* Chapters grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subject.chapters?.map((chapter: any) => (
          <Link
            to={`/video/${chapter._id}`}
            key={chapter._id}
            className="border rounded-xl shadow hover:shadow-lg transition bg-white p-4"
          >
            <h3 className="text-lg font-bold">{chapter.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {chapter.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
