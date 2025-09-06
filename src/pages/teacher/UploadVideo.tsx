import { useState, useEffect } from "react";
import axios from "axios";
import { endpoints } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadType, setUploadType] = useState<"file" | "link">("link");

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [level, setLevel] = useState("free");
  const [language, setLanguage] = useState("English");

  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headers = { Authorization: `Bearer ${token}` };

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
    try {
      if (uploadType === "file") {
        if (!videoFile) {
          alert("Please select a video file.");
          return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("level", level);
        formData.append("language", language);
        formData.append("video", videoFile);
        if (imageFile) formData.append("image", imageFile);

        await axios.post(endpoints.videosUpload, formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        });
      } else {
        if (!videoLink) {
          alert("Please enter a video link.");
          return;
        }

        await axios.post(
          endpoints.videosLink,
          {
            title,
            description,
            url: videoLink,
            level,
            language,
          },
          { headers }
        );
      }

      alert("Video added successfully!");
      navigate("/courses");
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add a New Video</h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Upload Type */}
        <div>
          <label className="block font-semibold mb-1">Video Source</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value as "file" | "link")}
          >
            <option value="link">Attach Link (YouTube/Vimeo)</option>
            <option value="file">Upload File</option>
          </select>
        </div>

        {/* File or Link Input */}
        {uploadType === "file" ? (
          <div>
            <label className="block font-semibold mb-1">Video File</label>
            <input type="file" accept="video/*" onChange={handleVideoChange} />
            {videoPreview && <video src={videoPreview} controls className="mt-2 w-full rounded-lg" />}
          </div>
        ) : (
          <div>
            <label className="block font-semibold mb-1">Video Link</label>
            <input
              type="text"
              placeholder="Paste YouTube/Vimeo URL"
              className="w-full border rounded px-3 py-2"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
          </div>
        )}

        {/* Thumbnail */}
        <div>
          <label className="block font-semibold mb-1">Thumbnail (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-full rounded-lg" />}
        </div>

        {/* Level & Language */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Level</label>
            <select
              className="border rounded px-3 py-2 w-full"
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
              className="border rounded px-3 py-2 w-full"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleUpload}
          className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          Save Video
        </button>
      </div>
    </div>
  );
}
