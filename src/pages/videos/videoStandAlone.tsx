import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { endpoints } from "../../api/endpoints";
import { getYouTubeThumbnail } from "../../utils";

export default function VideoStandAlone() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const fetchVideos = async () => {
      try {
        const res = await axios.get(endpoints.videos, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Standalone = not attached to a course/playlist/chapter
        const standalone = res.data.videos.filter(
          (v: any) => !v.course && !v.chapter
        );
        setVideos(standalone);
      } catch (err) {
        console.error("Error fetching standalone videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [token]);

  if (loading) return <p className="p-6">Loading videos...</p>;


  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">
      {videos.length > 0 ? <h2 className="text-3xl font-bold mb-6">Videos</h2> : <p>No videos available</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video._id}
            to={`/videos/${video._id}`}
            className="flex flex-col justify-between h-full border rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden bg-white"
          >
            {/* Thumbnail */}
            <div className="w-full aspect-video overflow-hidden rounded-t-xl bg-gray-100">
              <img
                src={
                  video.thumbnail ||
                  getYouTubeThumbnail(video.url) ||
                  "/default-thumbnail.png"
                }
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between px-4 py-3 flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {video.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs mb-2">
                <span className="flex items-center gap-1">
                  🎧 {video.language || "English"}
                </span>
                <span className="flex items-center gap-1">
                  📅 {new Date(video.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                {video.description || "No description available."}
              </p>

              {/* Uploader */}
              {video.createdBy && (
                <p className="text-xs text-gray-500 mt-auto">
                  Uploaded by <strong>{video.createdBy.name}</strong>
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
