import { useEffect, useState } from "react";
import axios from "axios";
import Leaderboard from "../components/Leaderboard";
import History from "../components/History";
import TopThreeCard from "../components/TopThreeCard";
import toast from "react-hot-toast";
import { motion } from "framer-motion";


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
    try {
      const { data } = await axios.post(`${API}/claim`, { userId: selectedId });
      toast.success(`+${data.points} points to ${data.user.name}`);
      setRefresh((r) => !r);
    } catch (err) {
      toast.error("Failed to claim points");
    }
  };


  const handleAddUser = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    if (!name) return toast.error("Enter a name");

    try {
      await axios.post(`${API}/users`, { name });
      toast.success("User added successfully!");
      e.target.reset();
      setRefresh((r) => !r);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add user");
    }
  };

  const sortedUsers = users.slice().sort((a, b) => b.totalPoints - a.totalPoints);
  const paginatedUsers = sortedUsers.slice((userPage - 1) * USERS_PER_PAGE, userPage * USERS_PER_PAGE);
  const paginatedHistory = history.slice((historyPage - 1) * HISTORY_PER_PAGE, historyPage * HISTORY_PER_PAGE);
  const topThree = (users || [])
    .filter(Boolean)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 3);


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-extrabold text-center text-blue-800"
        >
          🏆 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500 text-4xl font-black">Leaderboard System</span>
        </motion.h1>


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

        <h2 className="bg-clip-text font-bold text-2xl text-transparent text-center bg-gradient-to-b from-gray-300 via-gray-500 to-gray-800">Leaderboard
          
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-6 place-items-center">
          {topThree[1] && (
            <div className="order-1 w-full sm:w-36">
              <TopThreeCard user={topThree[1]} rank={2} />
            </div>
          )}
          {topThree[0] && (
            <div className="order-2 w-full sm:w-44">
              <TopThreeCard user={topThree[0]} rank={1} />
            </div>
          )}
          {topThree[2] && (
            <div className="order-3 w-full sm:w-36">
              <TopThreeCard user={topThree[2]} rank={3} />
            </div>
          )}
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
