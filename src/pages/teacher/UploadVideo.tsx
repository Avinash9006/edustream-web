import { useState, useEffect } from "react";
import axios from "axios";
import { endpoints } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [level, setLevel] = useState("free");
  const [language, setLanguage] = useState("English");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const navigate = useNavigate();

  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(endpoints.courses, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setPlaylists(res.data))
      .catch((err) => console.error("Failed to fetch playlists:", err));
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setVideoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !imageFile) {
      alert("Please select both video and image files.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("image", imageFile);
    formData.append("level", level);
    formData.append("language", language);
    if (selectedPlaylist) {
      formData.append("playlist", selectedPlaylist);
    }

    try {
      await axios.post(endpoints.video, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert("Video uploaded successfully!");
      navigate("/playlist");
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Upload a New Video</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Video File</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          {videoPreview && (
            <video src={videoPreview} controls className="mt-2 w-full rounded-lg" />
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-full rounded-lg" />
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Level</label>
            <select
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">Language</label>
            <select
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Playlist Selection */}
        <div>
          <label className="block font-semibold mb-1">Attach to Playlist (optional)</label>
          <select
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
          >
            <option value="">-- Upload as Standalone Video --</option>
            {playlists.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleUpload}
          className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          Upload Video
        </button>
      </div>
    </div>
  );
}
