import React, { useContext, useEffect, useState } from "react";
import useMCQ from "../../0.hooks/useMCQ";
import McqPage from "../../0.Components/McqPage";
import { Link } from "react-router-dom";
import QuestionSetButtons from "../../0.Components/QuestionSetButtons";

const Tests = () => {
  const [mcq] = useMCQ();
  const [filteredMCQs, setFilteredMCQs] = useState([]);
  const [testSet, setTestSet] = useState();

  // Get selection and scroll to top
  const getSelection = (sets) => {
    const filteredSet = mcq?.filter((mcqSet) => mcqSet.question_set === sets);
    setFilteredMCQs(filteredSet);
    setTestSet(sets);

    // Scroll to the top of the page
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-teal-600 text-white p-6 h-full fixed top-0 left-0 overflow-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Choose Test Set</h2>

        {/* Reusable component for selection buttons */}
        <QuestionSetButtons onSetSelect={getSelection} />
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full p-6">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
            Choose Your Test
          </h1>
          <div className="flex justify-center space-x-4 mb-8">
            <Link to="/randomized">
              <button className="btn btn-primary">Random Test</button>
            </Link>
            <Link to="/answers">
              <button className="btn btn-success">View Answers</button>
            </Link>
          </div>
        </div>

        {/* Test Set Header */}
        <div className="bg-teal-600 text-white text-center font-bold text-3xl p-4 mt-8">
          Take Test (<span className="">{testSet}</span>)
        </div>

        {/* Display the MCQ Page with filtered questions */}
        <div className="overflow-x-auto mt-4">
          <McqPage questions={filteredMCQs} testSet={testSet} />
        </div>
      </div>
    </div>
  );
};

export default Tests;
