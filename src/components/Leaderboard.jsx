
import TopThreeCard from "./TopThreeCard";
import UserRow from "./UserRow";

export default function Leaderboard({ users, currentPage, total, perPage, onPageChange }) {
  const totalPages = Math.ceil(total / perPage);
  const topThree = [...users]
  .sort((a, b) => b.totalPoints - a.totalPoints)
  .slice(0, 3);
  const rest = users.slice(0,5);

  return (
    <div>
      
      <div className="border-t">
        {rest.map((user, i) => (
          <UserRow key={user._id} user={user} rank={i + 1 + (currentPage - 1) * perPage} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
