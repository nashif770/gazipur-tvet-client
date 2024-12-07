import React, { useContext, useEffect, useState } from "react";
import useMCQ from "../../0.hooks/useMCQ";
import McqPage from "../../0.Components/McqPage";
import { Link } from "react-router-dom";
import QuestionSetButtons from "../../0.Components/QuestionSetButtons";

const Tests = () => {
  const [mcq] = useMCQ();
  const [filteredMCQs, setFilteredMCQs] = useState([]);
  const [testSet, setTestSet] = useState();

  const getSelection = (sets) => {
    const filteredSet = mcq?.filter((mcqSet) => mcqSet.question_set == sets);
    setFilteredMCQs(filteredSet);
    setTestSet(sets);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto px-6">
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

        {/* Use the reusable component */}
        <QuestionSetButtons onSetSelect={getSelection} />

        <div className="bg-teal-600 text-white text-center font-bold text-3xl p-4 mt-8">
          Take Test (<span className="">{testSet}</span>)
        </div>
        <div className="overflow-x-auto mt-4">
          <McqPage questions={filteredMCQs} testSet={testSet} />
        </div>
      </div>
    </div>
  );
};

export default Tests;
