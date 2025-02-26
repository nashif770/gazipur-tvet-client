import React, { useEffect, useState } from "react";
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="max-w-4xl w-full mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Choose Your Test</h1>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <Link to="/randomized">
              <button className="btn btn-primary">Random Test</button>
            </Link>
            <Link to="/answers">
              <button className="btn btn-success">View Answers</button>
            </Link>
          </div>
        </div>

        {/* Question Set Selection */}
        <QuestionSetButtons onSetSelect={getSelection} />

        {/* Test Section */}
        {testSet && (
          <>
            <div className="bg-teal-600 text-white text-center font-bold text-2xl p-4 mt-8 rounded-lg">
              Take Test (<span>{testSet}</span>)
            </div>
            <div className="overflow-x-auto mt-4">
              <McqPage questions={filteredMCQs} testSet={testSet} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tests;
