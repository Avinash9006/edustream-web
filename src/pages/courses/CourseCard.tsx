import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface CourseCardProps {
  courseId: string;
  title: string;
  description: string;
  level: string;
  language: string;
  canAccess: boolean;
  thumbnail?: string;
}

export default function CourseCard({
  courseId,
  title,
  description,
  level,
  language,
  canAccess,
  thumbnail,
}: CourseCardProps) {
  if (!canAccess) {
    // Non-accessible card
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden cursor-not-allowed relative">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={thumbnail || "https://www.collegechalo.com/news/wp-content/uploads/2024/01/BA-Courses.png"}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <LockClosedIcon className="h-10 w-10 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h2>
          <p className="text-gray-600 mt-2 text-sm line-clamp-3">{description}</p>
        </div>
      </div>
    );
  }

  // Accessible card: whole card clickable
  return (
    <Link
      to={`/course/${courseId}`}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 block"
    >
      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={thumbnail || "https://www.collegechalo.com/news/wp-content/uploads/2024/01/BA-Courses.png"}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{description}</p>
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          {level && <span className="px-2 py-1 bg-gray-100 rounded-full">{level}</span>}
          {language && <span className="px-2 py-1 bg-gray-100 rounded-full">{language}</span>}
        </div>
      </div>
    </Link>
  );
}
