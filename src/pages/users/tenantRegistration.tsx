import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../api/endpoints";

export default function RegisterTenant() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !companyName.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("companyName", companyName);
    if (logo) formData.append("logo", logo);

    try {
      await axios.post(endpoints.registerTenant, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Tenant registered successfully! Please login.");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register as Tenant</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Full Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Password *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password (min 6 chars)"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Institute Name *</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter your company name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Logo (optional)</label>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="mt-2 w-32 h-32 object-contain border rounded"
          />
        )}
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
      >
        Register
      </button>
    </div>
  );
}
