import { useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

export default function VideoPlayer({ url, thumbnail, title, description }: VideoPlayerProps) {

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1">
      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <ReactPlayer
          src={url}
          controls
          width="100%"
          height="100%"
          light={thumbnail || "/default-thumbnail.png"}
          onContextMenu={(e) => e.preventDefault()}
          className="rounded-lg"
        />

        {/* Overlay Timer */}
        {/* {duration > 0 && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            ⏳ {formatTime(duration - playedSeconds)} left
          </span>
        )} */}
      </div>

      {/* Video Info */}
      {title && <h2 className="text-2xl font-bold mt-4">{title}</h2>}
      {description && <p className="text-gray-700 mt-2">{description}</p>}
    </div>
  );
}
