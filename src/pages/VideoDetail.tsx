import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../api/endpoints";
import VideoPlayer from "../components/VideoPlayer";

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<{ title: string; description: string; url: string; thumbnail?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${endpoints.video}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVideo(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!video)
    return (
      <div className="text-center py-10 text-gray-500">Loading...</div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">{video.title}</h2>
      <p className="text-gray-700 mb-6">{video.description}</p>

      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
        <VideoPlayer url={video.url} thumbnail={video.thumbnail} />
      </div>
    </div>
  );
}
