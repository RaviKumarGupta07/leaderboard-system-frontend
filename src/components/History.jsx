
export default function History({ history, currentPage, total, perPage, onPageChange }) {
  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-center">Recent Activity</h2>
      <div className="space-y-2">
        {history.map((item, idx) => (
          <div key={item._id || idx} className="border p-3 rounded bg-gray-50 text-sm">
            <span className="font-semibold">{item.user?.name || "Unknown"}</span>{" "}
            earned <span className="text-green-600 font-bold">+{item.points}</span> points.
            <span className="text-gray-500 ml-2 text-xs">{new Date(item.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
