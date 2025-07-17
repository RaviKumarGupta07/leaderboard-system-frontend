// src/components/UserRow.jsx

export default function UserRow({ user, rank }) {
  return (
    <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold w-6 text-gray-600">{rank}.</span>
        <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium">{user.name}</span>
      </div>
      <span className="font-bold text-gray-700">{user.totalPoints} pts</span>
    </div>
  );
}
