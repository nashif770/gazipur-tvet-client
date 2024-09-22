import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WrittenTest = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await fetch("http://localhost:5000/questions");
        const data = await response.json();
        setQuestionSets(data);
      } catch (error) {
        console.error("Error fetching question sets:", error);
      }
    };

    fetchQuestionSets();
  }, []);

  const handleSelectSet = (set) => {
    setSelectedSet(set);
    navigate(`/answerSheet/${set.title}`); // Navigate to the answer page with set title
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select a Question Set</h2>

      <div className="grid grid-cols-1 gap-4 max-w-[600px] m-auto">
        {questionSets.map((set, index) => (
          <div
            key={index}
            onClick={() => handleSelectSet(set)}
            className={`rounded-lg shadow-md p-6 cursor-pointer ${
              selectedSet?.title === set.title
                ? "bg-green-200 border-green-500"
                : "bg-gray-300"
            }`}
          >
            <p className="text-lg font-semibold mb-2 text-gray-900">
              {set.title}
            </p>
            <p className="text-gray-700">
              Questions: {set.selectedQuestions.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WrittenTest;
