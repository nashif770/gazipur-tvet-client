import React, { useContext, useEffect, useState } from "react";
import useMCQ from "../../0.hooks/useMCQ";
import QuizCards from "../../0.Components/QuizCards";
import McqPage from "../../0.Components/McqPage";
import useUser from "../../0.hooks/useUser";
import { AuthContext } from "../../0.providers/AuthProvider";
import { Link } from "react-router-dom";

const questionSets = [
  { set: "Set 1" },
  { set: "Set 2" },
  { set: "Set 3" },
  { set: "Set 4" },
  { set: "Set 5" },
  { set: "Set 6" },
  { set: "Set 7" },
];

const Tests = () => {
  const [mcq] = useMCQ();
  const [storedUsers] = useUser();
  const [filteredMCQs, setFilteredMCQs] = useState([]);
  const [testSet, setTestSet] = useState();
  const { user } = useContext(AuthContext);

  //   console.log("Stored users", storedUsers, user)

  const mainUser = storedUsers?.find(
    (loggedUser) => loggedUser.email === user.email
  );

  const getSelection = (sets) => {
    const filteredSet = mcq?.filter((mcqSet) => mcqSet.question_set == sets);
    setFilteredMCQs(filteredSet);
    setTestSet(sets);
  };

  //   console.log("filtered",filteredMCQs)

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {questionSets.map((button, index) => (
            <button
              key={index}
              className="btn btn-secondary w-full md:w-auto"
              onClick={() => getSelection(button?.set)}
            >
              {button?.set}
            </button>
          ))}
        </div>
        <div className="bg-teal-600 text-white text-center font-bold text-3xl p-4 mt-8">
          Take Test (<span className="">{testSet}</span>)
        </div>
        <div className="overflow-x-auto mt-4">
          <McqPage
            questions={filteredMCQs}
            mainUser={mainUser}
            testSet={testSet}
          />
        </div>
      </div>
    </div>
  );
};

export default Tests;