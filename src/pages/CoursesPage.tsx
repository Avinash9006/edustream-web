import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../api/endpoints";
import { Link } from "react-router-dom";

type Course = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  level?: string;
  language?: string;
  rating?: string;
  reviews?: string;
  enrolled?: boolean;
  progress?: number;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.courses, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCourses(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/course/${course._id}`}
            className="flex flex-col justify-between h-full border rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden bg-white"
          >
            {/* Course Image */}
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={
                  course.image ||
                  "https://www.collegechalo.com/news/wp-content/uploads/2024/01/BA-Courses.png"
                }
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Course Content */}
            <div className="flex flex-col justify-between px-4 py-3 flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                {course.enrolled && (
                  <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                    ENROLLED
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-3">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
