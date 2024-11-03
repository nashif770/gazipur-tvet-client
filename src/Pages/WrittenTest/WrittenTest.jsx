import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WrittenTest = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await fetch(
          "https://gazipur-tvet-server-1.onrender.com/questions"
        );
        const data = await response.json();

        // Check if data is an array and has the expected structure
        if (Array.isArray(data)) {
          setQuestionSets(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching question sets:", error);
      }
    };

    fetchQuestionSets();
  }, []);

  if (!questionSets) {
    <div>Loading</div>;
  }

  const handleSelectSet = (set) => {
    if (set && set.title) {
      setSelectedSet(set);
      navigate(`/answerSheet/${encodeURIComponent(set.title)}`); // Navigate safely with encoded title
    } else {
      console.error("Selected set does not have a valid title.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white text-center">
        Select a Question Set
      </h2>
      {/* Display a message if there are no question sets available */}
      {questionSets.length === 0 ? (
        <p className="text-red-500 h-[100px] text-2xl text-center font-bold">
          Loading...
        </p>
      ) : (
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
                {set.title || "Untitled Set"}{" "}
                {/* Fallback if title is missing */}
              </p>
              <p className="text-gray-700">
                Questions: {set.selectedQuestions?.length || 0} {/* Fallback */}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WrittenTest;
