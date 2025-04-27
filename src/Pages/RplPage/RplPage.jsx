import React, { useEffect, useState } from "react";
import useMCQ from "../../0.hooks/useMCQ";
import McqPage from "../../0.Components/McqPage";
import { Link } from "react-router-dom";

const RplPage = () => {
  const [mcq] = useMCQ();
  const [randomMCQs, setRandomMCQs] = useState([]);

  const shuffleQuestions = () => {
    if (mcq && mcq.length > 0) {
      const shuffled = [...mcq].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 30); // Select 30 questions
      setRandomMCQs(selected);
    }
  };

  useEffect(() => {
    shuffleQuestions(); // Shuffle once when page loads
  }, [mcq]);

  return (
    <div className="min-h-screen flex flex-col text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto">
        {/* Page Title */}
        <div className="text-center mt-6">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Randomized Test for RPL Candidates
          </h1> 
        </div>

        {/* Re-Randomize Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={shuffleQuestions}
            className="btn btn-warning text-sm sm:text-base px-4 py-2"
          >
            Re-Shuffle Test
          </button>
        </div>

        {/* Test Section */}
        {randomMCQs.length > 0 ? (
          <>
            <div className="bg-teal-600 text-white text-center font-bold text-xl sm:text-2xl p-4 mt-4 rounded-lg">
              Start Test
            </div>
            <div className="overflow-x-auto mt-4">
              <McqPage rpl={"rpl"} questions={randomMCQs} testSet="Random" />
            </div>
          </>
        ) : (
          <div className="text-center mt-20 text-lg font-semibold">
            Loading Questions...
          </div>
        )}
      </div>
    </div>
  );
};

export default RplPage;
