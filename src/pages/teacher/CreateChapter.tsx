import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { endpoints } from "../../api/endpoints";

type Video = {
  _id: string;
  title: string;
};

export default function CreateChapter() {
  const { subjectId, courseId } = useParams<{ subjectId: string; courseId: string }>();
  const [title, setTitle] = useState("");
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const navigate = useNavigate();

  // Fetch all videos (standalone + others)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(endpoints.videos, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideos(res.data.videos || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  // Toggle video selection
  const handleVideoToggle = (id: string) => {
    setSelectedVideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  // Submit chapter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${endpoints.courses}/${courseId}/subjects/${subjectId}/chapters`,
        { title, videos: selectedVideos }, // ✅ send multiple videos
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(-1);
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Add Chapter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Chapter title */}
        <input
          type="text"
          placeholder="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        {/* Video selection list */}
        <div>
          <h3 className="font-semibold mb-2">Select Videos</h3>
          <div className="max-h-48 overflow-y-auto border rounded p-2 space-y-2">
            {videos.map((video) => (
              <label key={video._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedVideos.includes(video._id)}
                  onChange={() => handleVideoToggle(video._id)}
                />
                <span>{video.title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
