import React, { useState } from "react";
import useMCQ from "../0.hooks/useMCQ";

const QuestionSetButtons = ({ onSetSelect }) => {
  const [mcq] = useMCQ();
  const [currentPage, setCurrentPage] = useState(1);
  const setsPerPage = 10; // Number of sets per page

  // Ensure mcq is an array and not undefined or null
  const uniqueQuestionSets = Array.from(
    new Set((Array.isArray(mcq) ? mcq : [])?.map((item) => item.question_set))
  ).map((set) => ({ set }));

  // Pagination calculations
  const totalPages = Math.ceil(uniqueQuestionSets.length / setsPerPage);
  const startIndex = (currentPage - 1) * setsPerPage;
  const paginatedSets = uniqueQuestionSets.slice(
    startIndex,
    startIndex + setsPerPage
  );

  return (
    <div className="p-6 m-auto text-center w-full max-w-5xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-80 overflow-y-auto p-2">
        {paginatedSets.map((button, index) => (
          <button
            key={index}
            className="bg-white text-black hover:text-white font-bold rounded-lg hover:bg-cyan-600 w-full h-[50px] transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={() => onSetSelect(button.set)}
          >
            {button.set}
          </button>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded w-[100px] ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 "
          }`}
        >
          Previous
        </button>
        <div className="w-[200px] font-semibold text-lg overflow-hidden text-white">
            Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 w-[100px] rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionSetButtons;
