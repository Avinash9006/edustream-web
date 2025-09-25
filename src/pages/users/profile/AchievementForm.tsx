import { useState } from "react";

type Achievement = {
  _id?: string;
  title: string;
  type?: string;
  date?: string;
};

export default function AchievementForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: Achievement;
  onSave: (data: Achievement) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState<Achievement>({
    title: "",
    type: "course",
    date: "",
    ...initialData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title.trim()) {
      alert("Title is required");
      return;
    }
    onSave(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md space-y-3"
      >
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Achievement" : "Add Achievement"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="type"
          value={data.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="course">Course</option>
          <option value="award">Award</option>
          <option value="certificate">Certificate</option>
          <option value="project">Project</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          name="date"
          placeholder="Date (optional)"
          value={data.date || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
