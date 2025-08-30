// src/pages/TeacherDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endpoints";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.courses, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${endpoints.courses}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      alert("Failed to delete course");
    }
  };

  return (
    <div className="px-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Manage Courses</h2>
        <Link to="/create-course">
          <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition">
            + Add Course
          </button>
        </Link>
      </div>

      {/* Course Tiles */}
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses found. Create one to get started.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Thumbnail */}
              {course.image ? (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h3 className="font-semibold text-lg truncate">{course.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/course/${course._id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Manage
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-500 font-medium hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
