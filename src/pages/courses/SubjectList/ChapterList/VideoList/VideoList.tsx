import { useState } from "react";
import ReactPlayer from "react-player";
import { getYouTubeThumbnail } from "../../../../../utils";

interface Video {
  _id: string;
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
}

interface VideoListPlayerProps {
  videos: Video[];
}

export default function VideoListPlayer({ videos }: VideoListPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentVideo = videos[currentIndex];

  const handleVideoEnd = () => {
    if (currentIndex + 1 < videos.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop to first
    }
  };

  return (
    <div className="flex gap-6">
      {/* Left: Main Video */}
      {videos.length > 0 ? (
        <div className="w-2/3 flex flex-col">
          {currentVideo ? (
            <>
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                <ReactPlayer
                  key={currentVideo._id}
                  src={currentVideo.url}
                  controls
                  width="100%"
                  height="100%"
                  light={
                    currentVideo.thumbnail ||
                    getYouTubeThumbnail(currentVideo.url) ||
                    "/default-thumbnail.png"
                  }
                  onEnded={handleVideoEnd}
                  className="rounded-lg"
                  playing
                />
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold">{currentVideo.title}</h2>
                {currentVideo.description && (
                  <p className="text-gray-700 mt-2">
                    {currentVideo.description}
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select a video to play</p>
          )}
        </div>
      ) : (
        <p> No Lectures available</p>
      )}

      {/* Right: Video List */}
      <div className="w-1/3 max-h-[80vh] overflow-y-auto">
        {videos.length > 0 && (
          <h3 className="font-bold mb-4 text-lg">Up Next</h3>
        )}
        <ul className="space-y-2">
          {videos.map((video, index) => (
            <li
              key={video._id}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer 
                ${
                  currentIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={
                  video.thumbnail ||
                  getYouTubeThumbnail(video.url) ||
                  "/logo.png"
                }
                alt={video.title}
                className="w-20 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">
                  {video.title}
                </p>
                {video.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
