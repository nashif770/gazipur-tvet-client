import React, { useState } from "react";
import useShortQuestions from "../../0.hooks/useShortQuestions";

const ShortQuestion = () => {
  const [shortQuestions] = useShortQuestions();
  const [selectedUnit, setSelectedUnit] = useState("All");
  const [selectLang, setSelectLang] = useState("en"); // State for selected language
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Extract unique units from the questions data
  const uniqueUnits = [
    "All", // Default option
    ...[...new Set(shortQuestions.questions?.map((question) => question.unit))], // Extract unique units
  ];

  // Filter questions based on selected unit
  const filteredQuestions =
    selectedUnit === "All"
      ? shortQuestions.questions
      : shortQuestions.questions?.filter(
          (question) => question.unit === selectedUnit
        );

  // Search filter: Filter questions based on the search term
  const searchedQuestions = filteredQuestions?.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.answer.en.toLowerCase().includes(searchTerm.toLowerCase()) || 
    question.answer.bn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      {/* Sticky Header with Responsive Dropdown */}
      <div className="sticky top-16 bg-white z-10 py-4 shadow-md px-4">
        {/* Mobile Dropdown Toggle Button */}
        <div className="flex justify-between items-center md:hidden">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {dropdownOpen ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => setSelectLang(selectLang === "en" ? "bn" : "en")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Switch to {selectLang === "en" ? "Bengali" : "English"}
          </button>
        </div>
        {/* Dropdown Menu (Visible when open) */}
        {dropdownOpen && (
          <div className="mt-4 bg-gray-100 p-4 rounded md:hidden">
            {uniqueUnits.map((unit) => (
              <button
                key={unit}
                onClick={() => {
                  setSelectedUnit(unit);
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 my-1 rounded ${
                  selectedUnit === unit
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        )}
        

        {/* Desktop Unit Filter Buttons */}
        <div className="hidden md:flex justify-between items-center">
          <div>
            {uniqueUnits.map((unit) => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className={`px-4 py-2 mx-2 rounded ${
                  selectedUnit === unit
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>

          {/* Language Toggle Button (Desktop) */}
          <button
            onClick={() => setSelectLang(selectLang === "en" ? "bn" : "en")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Switch to {selectLang === "en" ? "Bengali" : "English"}
          </button>
        </div>
         {/* Search Input Field */}
        <div className="m-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-3xl"
          />
        </div>
      </div>

      {/* Questions Display */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3 mt-4">
        {searchedQuestions?.map((question, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md p-6 bg-gray-300 min-h-72"
          >
            <p className="text-lg font-semibold mb-2 text-gray-900">
              {question.id}. {question.question}
            </p>
            <hr className="my-3" />
            {/* Display answer based on selected language */}
            <p className="text-black">
              {selectLang === "en" ? question.answer.en : question.answer.bn}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ShortQuestion;
