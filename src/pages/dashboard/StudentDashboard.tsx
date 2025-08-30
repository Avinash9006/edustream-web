// src/pages/StudentDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endpoints";

export default function StudentDashboard() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.courses, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/playlist/${course._id}`}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg"
          >
            <h3 className="font-semibold">{course.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {course.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
