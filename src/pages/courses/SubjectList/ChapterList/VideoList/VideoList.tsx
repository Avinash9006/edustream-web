import { useState } from "react";
import VideoPlayer from "../../../../../components/VideoPlayer";

export default function VideoList({ videos }: { videos: any[] }) {
  const [currentVideo, setCurrentVideo] = useState<any>(null);

  return (
    <div>
      <ul className="space-y-2">
        {videos.map((video) => (
          <li
            key={video.id}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => setCurrentVideo(video)}
          >
            <img
              src={video.thumbnail || "/default-thumbnail.png"}
              className="w-16 h-10 rounded object-cover"
              alt={video.title}
            />
            <span className="text-sm">{video.title}</span>
          </li>
        ))}
      </ul>

      {currentVideo && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">{currentVideo.title}</h4>
          <VideoPlayer url={currentVideo.url} thumbnail={currentVideo.thumbnail} />
        </div>
      )}
    </div>
  );
}
