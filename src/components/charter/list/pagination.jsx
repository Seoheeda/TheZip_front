const Pagination = ({
  startPage,
  endPage,
  currentPage,
  handlePageChange,
  handleGroupChange,
  goToStart,
  goToEnd,
}) => (
  <div className="flex justify-center items-center space-x-2 py-4">
    <button
      onClick={goToStart}
      className="px-1 py-2 text-xs bg-gray-200 rounded-md"
    >
      Start
    </button>
    <button
      onClick={() => handleGroupChange("prev")}
      className="px-1 py-1 bg-gray-200 rounded-md"
    >
      &lt;
    </button>
    {Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    ).map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-2 py-2 text-xs rounded-md ${
          currentPage === page ? "bg-primary-1 text-white" : "bg-gray-200"
        }`}
      >
        {page}
      </button>
    ))}
    <button
      onClick={() => handleGroupChange("next")}
      className="px-1 py-1 bg-gray-200 rounded-md"
    >
      &gt;
    </button>
    <button
      onClick={goToEnd}
      className="px-1 py-2 text-xs bg-gray-200 rounded-md"
    >
      End
    </button>
  </div>
);

export default Pagination;
