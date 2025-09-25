import { useRef } from "react";

export default function ProfileHeader({
  user,
  onImageChange, // 👈 new prop for image upload
  onEdit,
}: {
  user: any;
  onImageChange: (file: File) => void;
  onEdit: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click(); // open file selector
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]); // send file to parent
    }
  };

  return (
    <div className="h-40 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-lg relative">
      <div className="absolute -bottom-16 left-6 flex items-center gap-4">
        {/* Profile image upload */}
        <div
          className="relative cursor-pointer group"
          onClick={handleImageClick}
        >
          <img
            src={user.profileImage || "/default-profile.png"}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-sm font-medium">Change</span>
          </div>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-sm text-gray-200">{user.designation || "Student"}</p>
          <p className="text-sm text-gray-300">{user.email}</p>
        </div>
      </div>

      {/* Button to edit profile details */}
      <button
        onClick={onEdit}
        className="absolute right-6 bottom-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Edit Profile
      </button>
    </div>
  );
}
