import { useState } from "react";
import apiClient from "../../api/apiClient";

const AccountSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await apiClient.put("/user/profile", { name, email });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl text-white font-semibold mb-6">Account</h2>
      <div className="space-y-5">
        <input
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Full Name" className="w-full bg-slate-800 rounded-xl px-4 py-3 text-white"
        />
        <input
          value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" className="w-full bg-slate-800 rounded-xl px-4 py-3 text-white"
        />
        <button 
          onClick={handleUpdate} disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-xl px-5 py-3 text-white"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;