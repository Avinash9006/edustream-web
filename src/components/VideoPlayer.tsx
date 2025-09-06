import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

export default function VideoPlayer({
  url,
  thumbnail,
  title,
  description,
}: VideoPlayerProps) {
  return (
    <div className="flex-1">
      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        <ReactPlayer
          src={url} // ✅ use url instead of src
          controls
          width="100%"
          height="100%"
          light={thumbnail || "/default-thumbnail.png"} // ✅ preview until play
          onContextMenu={(e) => e.preventDefault()} // disable right-click
          className="rounded-lg"
        />
      </div>

      {/* Video Info */}
      {title && <h2 className="text-2xl font-bold mt-4">{title}</h2>}
      {description && <p className="text-gray-700 mt-2">{description}</p>}
    </div>
  );
}
