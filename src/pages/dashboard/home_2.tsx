import { Link } from "react-router-dom";

export default function Home_1() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-center">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Welcome, {user?.name || "Student"}!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Learning is a journey, and every step counts. Explore courses, practice regularly, and achieve your dreams!
      </p>

      {/* Motivational Quote */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
        <p className="text-blue-800 text-xl font-semibold">
          "Education is the most powerful weapon which you can use to change the world." – Nelson Mandela
        </p>
      </div>

      {/* Call-to-Action */}
      <Link
        to="/playlist"
        className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Explore Courses
      </Link>

      {/* Fun Section for Younger Students */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-yellow-50 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-2">Interactive Lessons</h3>
          <p className="text-gray-700">
            Fun activities and videos designed for students below 12 to make learning exciting!
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-2">Exam Preparation</h3>
          <p className="text-gray-700">
            Focused practice and tips for 12th grade students to ace exams confidently.
          </p>
        </div>
      </div>
    </div>
  );
}
