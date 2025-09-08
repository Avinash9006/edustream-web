import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoList from "./VideoList/VideoList";
import { endpoints } from "../../../../api/endpoints";

type Video = {
  _id: string;
  title: string;
  url: string;
  thumbnail?: string;
};

type Resource = {
  url: string | undefined;
  _id: string;
  title: string;
  type: string;
};

type Chapter = {
  _id: string;
  title: string;
  description?: string;
};

export default function ChapterTabs() {
  const { courseId, subjectId, id } = useParams<{
    courseId: string;
    subjectId: string;
    id: string;
  }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "description" | "videos" | "resources"
  >("description");

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch chapter details
        const chapterRes = await axios.get(
          `${endpoints.chapters(courseId || "", subjectId || "")}/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChapter(chapterRes.data.chapter);

        // Fetch chapter videos
        const videosRes = await axios.get(
          `${endpoints.videosChapterId(id || "")}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVideos(videosRes.data.videos || []);

        // Fetch chapter resources/notes
        const resourcesRes = await axios.get(
          `${endpoints.resourcesChapterId(id || "")}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setResources(resourcesRes.data.resources || []);
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchChapterData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!chapter) return <p>Chapter not found</p>;

  return (
    <div className="p-4">
      {/* Chapter title */}
      <h2 className="text-2xl font-bold mb-4">{chapter.title}</h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <a
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("description")}
          className={`pb-2 ${
            activeTab === "description"
              ? "border-b-2 border-purple-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Description
        </a>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("videos")}
          className={`pb-2 ${
            activeTab === "videos"
              ? "border-b-2 border-purple-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Lectures
        </a>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("resources")}
          className={`pb-2 ${
            activeTab === "resources"
              ? "border-b-2 border-purple-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Notes / Resources
        </a>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "description" && (
          <div className="text-gray-700">
            {chapter.description || "No description available."}
          </div>
        )}

        {activeTab === "videos" && <VideoList videos={videos} />}

        {activeTab === "resources" && (
          <ul className="space-y-2">
            {resources.length === 0 && <p>No resources available.</p>}
            {resources.map((res) => (
              <li
                key={res._id}
                className="flex items-center justify-between p-2 bg-gray-100 rounded"
              >
                <span>{res.title}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
