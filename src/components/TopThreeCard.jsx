

export default function TopThreeCard({ user, rank }) {
  const rankColors = ["bg-yellow-400", "bg-gray-400", "bg-orange-400"];
  const rankLabels = ["🥇", "🥈", "🥉"];

  return (
    <div className={`flex flex-col items-center p-4 rounded-xl shadow-lg ${rankColors[rank - 1]} text-white`}>
      <div className="text-4xl">{rankLabels[rank - 1]}</div>
      <div className="mt-2 w-14 h-14 rounded-full bg-white text-gray-800 flex items-center justify-center text-lg font-bold">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="mt-2 font-semibold">{user.name}</div>
      <div className="text-sm">{user.totalPoints} pts</div>
    </div>
  );
}

