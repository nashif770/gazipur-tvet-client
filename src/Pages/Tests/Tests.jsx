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
    console.log(sets, "button clicked");
    const filteredSet = mcq?.filter((mcqSet) => mcqSet.question_set == sets);
    setFilteredMCQs(filteredSet);
    setTestSet(sets);
  };

  //   console.log("filtered",filteredMCQs)

  return (
    <div>
      <div className="bg-slate-400 flex flex-col md:flex-row md:justify-center gap-4 p-6">
        {questionSets.map((button, index) => (
          <button
            key={index}
            className="btn btn-primary w-[100px] m-2"
            onClick={() => getSelection(button?.set)}
          >
            {button?.set}
          </button>
        ))}
        <Link to={"/randomized"}>
          <button className="btn w-[100px] m-2 bg-red-700 border-none text-white">Random</button>
        </Link>
        <Link to={"/answers"}>
          <button className="btn w-[100px] m-2 bg-green-500 border-none text-white">Answers</button>
        </Link>
      </div>
      <section>
        <div className="bg-teal-600 p-2 m-2">
          <h2 className="text-center text-white font-bold text-3xl m-auto">
            Take Test (<span className="">{testSet}</span>)
          </h2>
        </div>
        <McqPage questions={filteredMCQs} mainUser={mainUser} testSet={testSet}></McqPage>
      </section>
    </div>
  );
};

export default Tests;
