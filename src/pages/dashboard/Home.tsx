import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endpoints";
import Roles from "../../constants";
import CourseCard from "../courses/CourseCard";

interface Course {
  _id: string;
  title: string;
  description: string;
  level: string;
  language: string;
  teacher?: string;
  approved: boolean;
  thumbnail?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "anonymous" | "student" | "teacher" | "admin";
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser: User | null = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);

    const fetchCourses = async () => {
      try {
        const res = await axios.get<Course[]>(endpoints.courses, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setCourses(res.data || []);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  const isAdmin = user?.role === Roles.ADMIN;
  const isTeacher = user?.role === Roles.TEACHER;
  const isAnonymous = user?.role === Roles.ANONYMOUS;

  const canAccessCourse = ["admin", "teacher", "student"].includes(user?.role || "anonymous");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome, {user?.name || "Guest"}
      </h1>

      {isAnonymous && (
        <p className="text-gray-600">
          You are currently anonymous. Ask an admin to approve your account to
          become a student or teacher.
        </p>
      )}

      {/* Admin / Teacher Actions */}
      {(isAdmin || isTeacher) && (
        <div className="flex flex-wrap gap-4">
          {isAdmin && (
            <Link
              to="/create-course"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Create New Course
            </Link>
          )}
          {isTeacher && (
            <>
              <Link
                to="/upload"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Upload Video
              </Link>
              <Link
                to="/create-course"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Course
              </Link>
            </>
          )}
        </div>
      )}

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              courseId={course._id}
              title={course.title}
              description={course.description}
              level={course.level}
              language={course.language}
              canAccess={canAccessCourse}
              thumbnail={course.thumbnail}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No courses available.</p>
      )}
    </div>
  );
}
