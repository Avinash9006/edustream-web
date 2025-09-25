import { useEffect, useState } from "react";
import axios from "axios";

// Components
import { endpoints } from "../../../api/endpoints";
import ProfileHeader from "./ProfileHeader";
import ProfileEdit from "./ProfileEdit";
import ProfileTabs from "./ProfileTabs";

export default function ProfilePage() {
  const [user, setUser] = useState<any>({});
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(endpoints.profile, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data.user))
      .catch(console.error);
  }, []);

  const handleUpdate = (updatedUser: any) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleImageChange = async (file: File) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(endpoints.profile + "/upload-image", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });
    setUser(res.data.user); // update with new image
  } catch (err) {
    console.error(err);
    alert("Failed to upload image");
  }
};


  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <ProfileHeader  onImageChange = {()=>handleImageChange} user={user} onEdit={() => setIsEditing(true)} />

      {/* Tabs */}
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} user={user} setUser={setUser}/>

      {/* Edit Modal */}
      {isEditing && (
        <ProfileEdit user={user} onClose={() => setIsEditing(false)} onSave={handleUpdate} />
      )}
    </div>
  );
}
