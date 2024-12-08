import React, { useState } from "react";
import useShortQuestions from "../../0.hooks/useShortQuestions";

const ShortQuestion = () => {
  const [shortQuestions] = useShortQuestions();
  const [selectedUnit, setSelectedUnit] = useState("All");

  // Filter questions based on selected unit
  const filteredQuestions =
    selectedUnit === "All"
      ? shortQuestions.questions
      : shortQuestions.questions?.filter(
          (question) => question.unit === selectedUnit
        );

  // List of possible units for filtering
  const units = [
    "All",
    "MS Word",
    "MS PowerPoint",
    "MS Excel",
    "Troubleshooting",
    "Operate Computer",
  ];

  return (
    <div className="container mx-auto py-8">
      {/* Unit Filter Buttons */}
      <div className="mb-4">
        {units.map((unit) => (
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

      {/* Questions Display */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
        {filteredQuestions?.map((question, index) => (
          <div key={index} className="rounded-lg shadow-md p-6 bg-gray-300">
            <p className="text-lg font-semibold mb-2 text-gray-900">
              {index + 1}. {question.question}
            </p>
            <p className="text-black">{question.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ShortQuestion;
