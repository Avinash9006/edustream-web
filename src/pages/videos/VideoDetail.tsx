import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../api/endpoints";
import VideoPlayer from "../../components/VideoPlayer";

interface Video {
  _id: string;
  title: string;
  description: string;
  type:string;
  url: string;
  thumbnail?: string;
  createdBy?: { name: string; email: string };
  playlist?: { title: string };
  chapter?: { title: string };
}

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !id) return;

    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${endpoints.videos}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideo(res.data.video || res.data); // backend returns { video } in success response
      } catch (err) {
        console.error("Failed to fetch video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (!video) {
    return <div className="text-center py-10 text-red-500">Video not found</div>;
  }

  const getEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com/watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }
  if (url.includes("youtu.be/")) {
    return url.replace("youtu.be/", "www.youtube.com/embed/");
  }
  if (url.includes("vimeo.com/")) {
    return url.replace("vimeo.com/", "player.vimeo.com/video/");
  }
  return url;
};
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">{video.title}</h2>
      <p className="text-gray-700 mb-6">{video.description}</p>

      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
         {video.type === "link" ? (
        <iframe
          src={getEmbedUrl(video.url)}
          title={video.title || "Video"}
          className="w-full h-full"
          allowFullScreen
        />
      ) : (
         <VideoPlayer url={video.url} thumbnail={video.thumbnail} />
      )}
       
      </div>

      {video.playlist && (
        <p className="mt-4 text-sm text-gray-500">
          Playlist: <strong>{video.playlist.title}</strong>
        </p>
      )}
      {video.chapter && (
        <p className="text-sm text-gray-500">
          Chapter: <strong>{video.chapter.title}</strong>
        </p>
      )}
      {video.createdBy && (
        <p className="text-sm text-gray-500">
          Uploaded by: <strong>{video.createdBy.name}</strong> ({video.createdBy.email})
        </p>
      )}
    </div>
  );
}
