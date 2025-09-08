// src/components/Upload/Upload.tsx
import { useState } from "react";
import axios from "axios";
import { endpoints } from "../../api/endpoints";
import { UPLOADTYPE } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [type, setType] = useState("1"); // 1 = video, 2 = resource
  const [uploadType, setUploadType] = useState<"file" | "link">("file");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Video-specific
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Resource-specific
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [resourceLink, setResourceLink] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [resourceType, setResourceType] = useState("notes"); // notes | dpp | other

  // Common
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [level, setLevel] = useState("free");
  const [language, setLanguage] = useState("English");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isVideo = false) => {
    if (e.target.files && e.target.files[0]) {
      if (isVideo) {
        setVideoFile(e.target.files[0]);
        setVideoPreview(URL.createObjectURL(e.target.files[0]));
      } else {
        setResourceFile(e.target.files[0]);
        if (
          e.target.files[0].type.includes("pdf") ||
          e.target.files[0].type.includes("image")
        ) {
          setFilePreview(URL.createObjectURL(e.target.files[0]));
        } else {
          setFilePreview(null);
        }
      }
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
      if (type === "1") {
        // --- VIDEO ---
        if (uploadType === "file") {
          if (!videoFile) return alert("Please select a video file.");
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
          if (!videoLink) return alert("Please enter a video link.");
          await axios.post(
            endpoints.videosLink,
            { title, description, url: videoLink, level, language },
            { headers }
          );
        }
      } else {
        // --- RESOURCE ---
        if (uploadType === "file") {
          if (!resourceFile) return alert("Please select a resource file.");
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("category", resourceType);
          formData.append("type", uploadType);
          formData.append("resource", resourceFile);

          await axios.post(endpoints.resourcesUpload, formData, {
            headers: { ...headers, "Content-Type": "multipart/form-data" },
          });
        } else {
          if (!resourceLink) return alert("Please enter a resource link.");
          await axios.post(
            endpoints.resourcesLink,
            { title, description, url: resourceLink, category: resourceType, type:uploadType },
            { headers }
          );
        }
      }

      alert("Uploaded successfully!");
      navigate("/courses");
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {type === "1" ? "Add a New Video" : "Add a New Resource"}
      </h2>

      {/* Type Switcher */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">What do you want to upload?</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        >
          {UPLOADTYPE.map((v) => (
            <option key={v.id} value={v.id}>
              {v.value}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Upload Type */}
        <div>
          <label className="block font-semibold mb-1">
            {type === "1" ? "Video Source" : "Resource Source"}
          </label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value as "file" | "link")}
          >
            <option value="file">Upload File</option>
            <option value="link">Attach Link</option>
          </select>
        </div>

        {/* Extra field only for resources */}
        {type === "2" && (
          <div>
            <label className="block font-semibold mb-1">Resource Type</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
            >
              <option value="notes">Class Notes</option>
              <option value="dpp">DPP</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        {/* File or Link Input */}
        <div className="col-span-1 md:col-span-2">
          {uploadType === "file" ? (
            <div>
              <label className="block font-semibold mb-1">
                {type === "1" ? "Video File" : "Resource File"}
              </label>
              <input
                type="file"
                accept={type === "1" ? "video/*" : ".pdf,.doc,.docx,.ppt,.pptx,.zip,.jpg,.png"}
                onChange={(e) => handleFileChange(e, type === "1")}
              />
              {videoPreview && type === "1" && (
                <video src={videoPreview} controls className="mt-2 w-full rounded-lg" />
              )}
              {filePreview && type === "2" && (
                <iframe
                  src={filePreview}
                  className="mt-2 w-full h-64 border rounded-lg"
                  title="Resource Preview"
                />
              )}
            </div>
          ) : (
            <div>
              <label className="block font-semibold mb-1">
                {type === "1" ? "Video Link" : "Resource Link"}
              </label>
              <input
                type="text"
                placeholder={
                  type === "1"
                    ? "Paste YouTube/Vimeo URL"
                    : "Paste Google Drive/Dropbox URL"
                }
                className="w-full border rounded px-3 py-2"
                value={type === "1" ? videoLink : resourceLink}
                onChange={(e) =>
                  type === "1" ? setVideoLink(e.target.value) : setResourceLink(e.target.value)
                }
              />
            </div>
          )}
        </div>

        {/* Thumbnail only for video */}
        {type === "1" && (
          <div>
            <label className="block font-semibold mb-1">Thumbnail (optional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-40 h-24 object-cover rounded-lg border"
              />
            )}
          </div>
        )}

        {/* Level & Language only for video */}
        {type === "1" && (
          <>
            <div>
              <label className="block font-semibold mb-1">Language</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          onClick={handleUpload}
          className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700 transition"
        >
          Save {type === "1" ? "Video" : "Resource"}
        </button>
      </div>
    </div>
  );
}
