import React, { useState } from "react";
import useMCQ from "../../0.hooks/useMCQ";
import McqPage from "../../0.Components/McqPage";
import { Link } from "react-router-dom";
import QuestionSetButtons from "../../0.Components/QuestionSetButtons";

const Tests = () => {
  const [mcq] = useMCQ();
  const [filteredMCQs, setFilteredMCQs] = useState([]);
  const [testSet, setTestSet] = useState(null);

  // Function to handle selection of question set
  const getSelection = (sets) => {
    if (!mcq) return; // Ensure mcq is loaded before filtering
    const filteredSet = mcq.filter((mcqSet) => mcqSet.question_set === sets);
    setFilteredMCQs(filteredSet);
    setTestSet(sets);
  };

  return (
    <div className="min-h-screen flex flex-col text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto">
        {/* Page Title */}
        <div className="text-center mt-2">
          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <Link to="/randomized">
              <button className="btn btn-primary text-sm sm:text-base px-4 py-2">
                Random Test
              </button>
            </Link>
            <Link to="/answers">
              <button className="btn btn-success text-sm sm:text-base px-4 py-2">
                View Answers
              </button>
            </Link>
          </div>
        </div>

        {/* Question Set Selection */}
        <QuestionSetButtons onSetSelect={getSelection} />

        {/* Test Section */}
        {testSet && (
          <>
            <div className="bg-teal-600 text-white text-center font-bold text-xl sm:text-xl p-2 rounded-lg">
              Take Test (<span>{testSet}</span>)
            </div>
            <div className="overflow-x-auto mt-2">
              <McqPage questions={filteredMCQs} testSet={testSet} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tests;
