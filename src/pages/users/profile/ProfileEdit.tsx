import { useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api/endpoints";

export default function ProfileEdit({ user, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
    designation: user.designation || "",
    subjects: user.subjects || "", // teacher only
    grade: user.grade || "", // student only
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validate fields
  const validate = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.mobile && !/^\+?[0-9]{10,10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number (10 digits)";
    }

    if (user.role === "teacher" && !formData.subjects.trim()) {
      newErrors.subjects = "Subjects are required for teachers";
    }

    if (user.role === "student" && !formData.grade.trim()) {
      newErrors.grade = "Grade is required for students";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(endpoints.profile, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {/* Common fields */}
        <div className="mb-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full p-2 border rounded"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>

        <div className="mb-3">
          <input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Role-specific */}
        {user.role === "teacher" && (
          <div className="mb-3">
            <input
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              placeholder="Subjects taught"
              className="w-full p-2 border rounded"
            />
            {errors.subjects && (
              <p className="text-red-500 text-sm">{errors.subjects}</p>
            )}
          </div>
        )}

        {user.role === "student" && (
          <div className="mb-3">
            <input
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Grade/Class"
              className="w-full p-2 border rounded"
            />
            {errors.grade && (
              <p className="text-red-500 text-sm">{errors.grade}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
