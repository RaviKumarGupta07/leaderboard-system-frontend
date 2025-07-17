import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";
const USERS_PER_PAGE = 5;
const HISTORY_PER_PAGE = 6;

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [history, setHistory] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);

  useEffect(() => {
    axios.get(`${API}/users`).then((res) => {
      setUsers(res.data);
      if (!selectedId && res.data.length) setSelectedId(res.data[0]._id);
    });
  }, [refresh]);

  useEffect(() => {
    axios.get(`${API}/history`).then((res) => setHistory(res.data));
  }, [refresh]);

  const handleClaim = async () => {
    if (!selectedId) return;
    const { data } = await axios.post(`${API}/claim`, { userId: selectedId });
    alert(`+${data.points} points to ${data.user.name}`);
    setRefresh((r) => !r);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    if (!name) return alert("Enter a name");

    try {
      await axios.post(`${API}/users`, { name });
      e.target.reset();
      setRefresh((r) => !r);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add user");
    }
  };

  const sortedUsers = users.slice().sort((a, b) => b.totalPoints - a.totalPoints);
  const paginatedUsers = sortedUsers.slice((userPage - 1) * USERS_PER_PAGE, userPage * USERS_PER_PAGE);
  const paginatedHistory = history.slice((historyPage - 1) * HISTORY_PER_PAGE, historyPage * HISTORY_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">🏆 Leaderboard System</h1>

        {/* Select & Claim Points */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Select User</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleClaim}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
          >
            Claim Points
          </button>
        </div>

        {/* Add User */}
        <form onSubmit={handleAddUser} className="flex flex-col sm:flex-row gap-2">
          <input
            name="name"
            placeholder="Enter new user name"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>

        {/* Leaderboard */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Leaderboard</h2>
          <ul className="space-y-2">
            {paginatedUsers.map((u, i) => (
              <li
                key={u._id}
                className="flex justify-between p-3 bg-gray-50 rounded text-sm sm:text-base"
              >
                <span className="flex items-center gap-2">
  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
    {u.name.charAt(0).toUpperCase()}
  </div>
  <span>
    {i + 1 + (userPage - 1) * USERS_PER_PAGE}. {u.name}
  </span>
</span>
                <span className="font-medium">{u.totalPoints} pts</span>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={userPage}
            total={sortedUsers.length}
            perPage={USERS_PER_PAGE}
            onChange={setUserPage}
          />
        </div>

        {/* Claim History */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Claim History</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {paginatedHistory.map((h) => (
              <li
                key={h._id}
                className="flex justify-between text-sm text-gray-600"
              >
                <span>
                  {new Date(h.claimedAt).toLocaleTimeString()} — {h.userId.name} +{h.points} pts
                </span>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={historyPage}
            total={history.length}
            perPage={HISTORY_PER_PAGE}
            onChange={setHistoryPage}
          />
        </div>
      </div>
    </div>
  );
}

// Reusable Pagination Component
function Pagination({ currentPage, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-3 gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
