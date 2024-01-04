import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useMCQ from "../../0.hooks/useMCQ";
import useUser from "../../0.hooks/useUser";
import { AuthContext } from "../../0.providers/AuthProvider";

const questionSets = [
  { set: "Set 1" },
  { set: "Set 2" },
  { set: "Set 3" },
  { set: "Set 4" },
  { set: "Set 5" },
  { set: "Set 6" },
  { set: "Set 7" },
];

const Answers = () => {
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
    <div
      className="bg-cover bg-center p-3"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg',
      }}
    >
  <div className="flex flex-col md:flex-row justify-center gap-3 p-3">
    {questionSets.map((button, index) => (
      <button
        key={index}
        className="btn w-full btn-primary sm:w-[100px] m-2 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => getSelection(button?.set)}
      >
        {button?.set}
      </button>
    ))}
    <Link to="/tests">
      <button className="btn w-[100px] m-2 bg-red-700 border-none text-white transition duration-300 ease-in-out transform hover:scale-105">
        Back to Tests
      </button>
    </Link>
  </div>
  <section>
    <div className="bg-teal-600 p-2 m-2 rounded-md">
      <h2 className="text-center text-white font-bold text-3xl m-auto">
        Answers (<span className="">{testSet}</span>)
      </h2>
    </div>
    <div className="flex flex-col gap-3">
      {filteredMCQs.map((answers, index) => (
        <div key={index} className="bg-slate-300 rounded-lg p-3 w-1/2 m-auto shadow-md">
          <h3 className="text-lg w-full border bg-teal-100 border-none p-2 rounded-lg mb-4">
            <span className="font-bold">
              Question {index + 1} - {answers.question_set}:
            </span>
            <span className="ml-2">{answers.question}</span>
          </h3>
          <div className="w-full">
            <p className="ms-5 text-xl font-semibold p-2 bg-green-200 rounded-lg">
              Correct Answer: {answers.correct_answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>
  );
};

export default Answers;
