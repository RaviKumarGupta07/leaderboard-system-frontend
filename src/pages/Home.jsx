import { useEffect, useState } from "react";
import axios from "axios";
import Leaderboard from "../components/Leaderboard";
import History from "../components/History";
import TopThreeCard from "../components/TopThreeCard";

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
  const topThree = [...users]
  .sort((a, b) => b.totalPoints - a.totalPoints)
  .slice(0, 3);

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
        <h2 className="text-xl font-semibold mb-2 text-center">Leaderboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {topThree.map((user, idx) => (
                  <TopThreeCard key={user._id} user={user} rank={idx + 1} />
                ))}
              </div>

        {/* Leaderboard Component */}
        <Leaderboard
          users={paginatedUsers}
          currentPage={userPage}
          total={sortedUsers.length}
          perPage={USERS_PER_PAGE}
          onPageChange={setUserPage}
        />

        {/* History Component */}
        <History
          history={paginatedHistory}
          currentPage={historyPage}
          total={history.length}
          perPage={HISTORY_PER_PAGE}
          onPageChange={setHistoryPage}
        />
      </div>
    </div>
  );
}
