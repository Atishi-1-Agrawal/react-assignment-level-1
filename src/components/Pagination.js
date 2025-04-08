import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
