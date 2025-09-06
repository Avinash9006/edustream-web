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

type Chapter = {
  _id: string;
  title: string;
  description?: string;
};

export default function ChapterList() {
  const { courseId, subjectId, id } = useParams<{ courseId: string; subjectId: string,id: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1️⃣ Fetch chapter details
        const chapterRes = await axios.get(`${endpoints.chapters(courseId || '',subjectId || '')}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChapter(chapterRes.data.chapter);

        // 2️⃣ Fetch chapter videos
        const videosRes = await axios.get(`${endpoints.videosChapterId(id || '')}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideos(videosRes.data.videos || []);
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
    <div className="space-y-4 pl-4 border-l-2 border-gray-300">
      <div className="p-3">
        <h3 className="text-lg font-semibold">{chapter.title}</h3>
        {chapter.description && <p className="text-gray-600">{chapter.description}</p>}
        <VideoList videos={videos} />
      </div>
    </div>
  );
}
