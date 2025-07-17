import { useState } from "react";
import axios from "axios";

export default function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");

  const handleAddUser = async () => {
    if (!name) return alert("Name required");
    try {
      const res = await axios.post("http://localhost:5000/api/users", { name });
      setName("");
      onUserAdded?.(); // optional chaining
      alert("User Added!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to add user");
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1 mr-2"
      />
      <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-1">
        Add User
      </button>
    </div>
  );
}
