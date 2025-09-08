import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endpoints";
import { getYouTubeThumbnail } from "../../utils";

export default function VideoStandAlone() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchVideos = async () => {
    try {
      const res = await axios.get(endpoints.videos, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Standalone = not attached to a course/playlist/chapter
      const standalone = res.data.videos.filter(
        (v: any) => !v.course && !v.chapterId // ✅ use chapterId check
      );
      setVideos(standalone);
    } catch (err) {
      console.error("Error fetching standalone videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchVideos();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`${endpoints.videos}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Error deleting video:", err);
      alert("Failed to delete video");
    }
  };

  if (loading) return <p className="p-6">Loading videos...</p>;

  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      {videos.length > 0 ? (
        <h2 className="text-3xl font-bold mb-6">Videos</h2>
      ) : (
        <p>No standalone videos available</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="flex flex-col justify-between h-full border rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden bg-white"
          >
            {/* Thumbnail */}
            <Link
              to={`/videos/${video._id}`}
              className="w-full aspect-video overflow-hidden rounded-t-xl bg-gray-100 block"
            >
              <img
                src={
                  video.thumbnail ||
                  getYouTubeThumbnail(video.url) ||
                  "/default-thumbnail.png"
                }
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </Link>

            {/* Content */}
            <div className="flex flex-col justify-between px-4 py-3 flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {video.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs mb-2">
                <span>🎧 {video.language || "English"}</span>
                <span>📅 {new Date(video.createdAt).toLocaleDateString()}</span>
              </div>

              <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                {video.description || "No description available."}
              </p>

              {video.createdBy && (
                <p className="text-xs text-gray-500 mt-auto">
                  Uploaded by <strong>{video.createdBy.name}</strong>
                </p>
              )}

              {/* Delete Button */}
              {(user.role === "teacher" || user.role === "admin") && (
                <button
                  onClick={() => handleDelete(video._id)}
                  className="mt-3 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
