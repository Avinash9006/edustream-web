import VideoList from "./VideoList/VideoList";

export default function ChapterList({ chapters }: { chapters: any[] }) {
  return (
    <div className="space-y-4 pl-4 border-l-2 border-gray-300">
      {chapters.map((chapter) => (
        <div key={chapter.id} className="p-3">
          <h3 className="text-lg font-semibold">{chapter.title}</h3>
          <VideoList videos={chapter.videos} />
        </div>
      ))}
    </div>
  );
}
