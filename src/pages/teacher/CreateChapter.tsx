import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { endpoints } from "../../api/endpoints";

type Video = { _id: string; title: string };
type Resource = { _id: string; title: string };

export default function CreateChapter() {
  const { subjectId, courseId } = useParams<{ subjectId: string; courseId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videos, setVideos] = useState<Video[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingResources, setLoadingResources] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // Fetch standalone videos
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
      } finally {
        setLoadingVideos(false);
      }
    };
    fetchVideos();
  }, []);

  // Fetch standalone resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(endpoints.resources, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResources(res.data.resources || []);
      } catch (err) {
        console.error("Error fetching resources:", err);
      } finally {
        setLoadingResources(false);
      }
    };
    fetchResources();
  }, []);

  const handleVideoToggle = (id: string) => {
    setSelectedVideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const handleResourceToggle = (id: string) => {
    setSelectedResources((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${endpoints.courses}/${courseId}/subjects/${subjectId}/chapters`,
        {
          title,
          description,
          videos: selectedVideos,
          resources: selectedResources,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/course/${courseId}/subject/${subjectId}`);
    } catch (error) {
      console.error("Error creating chapter:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Add Chapter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Chapter Title */}
        <input
          type="text"
          placeholder="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        {/* Chapter Description */}
        <textarea
          placeholder="Chapter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
        />

        {/* Video Selection */}
        <div>
          <h3 className="font-semibold mb-2">Select Videos</h3>
          {loadingVideos ? (
            <p className="text-gray-500">Loading videos...</p>
          ) : videos.length === 0 ? (
            <p className="text-gray-500">No videos available.</p>
          ) : (
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
          )}
        </div>

        {/* Resource Selection */}
        <div>
          <h3 className="font-semibold mb-2">Select Resources</h3>
          {loadingResources ? (
            <p className="text-gray-500">Loading resources...</p>
          ) : resources.length === 0 ? (
            <p className="text-gray-500">No resources available.</p>
          ) : (
            <div className="max-h-48 overflow-y-auto border rounded p-2 space-y-2">
              {resources.map((resource) => (
                <label key={resource._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedResources.includes(resource._id)}
                    onChange={() => handleResourceToggle(resource._id)}
                  />
                  <span>{resource.title}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
