import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../api/endpoints";
import { Link } from "react-router-dom";

export default function Playlist() {
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.courses, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setPlaylists(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {playlists.map((v) => (
          <Link
            key={v._id}
            to={`/playlist/${v._id}`}
            className="flex flex-col justify-between h-full border rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden bg-white"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={
                  v.image ||
                  "https://www.collegechalo.com/news/wp-content/uploads/2024/01/BA-Courses.png"
                }
                alt={v.title}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between px-4 py-3 flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{v.title}</h3>
                {v.enrolled && (
                  <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                    ENROLLED
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs mb-2">
                {v.level === "premium" && (
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full flex items-center gap-1">
                    👑 PREMIUM
                  </span>
                )}
                <span className="flex items-center gap-1">
                  🎧 {v.language || "English"}
                </span>
                <span className="flex items-center gap-1">
                  ⭐ {v.rating || "4.9"} ({v.reviews || "1K+"} Reviews)
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-3">{v.description}</p>

              {/* Progress */}
              <div>
                <div className="text-right text-xs mb-1">
                  {v.progress || 0}% completed
                </div>
                <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${v.progress || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
