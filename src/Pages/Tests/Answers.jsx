import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useMCQ from "../../0.hooks/useMCQ";
import QuestionSetButtons from "../../0.Components/QuestionSetButtons";

const Answers = () => {
  const [mcq] = useMCQ();
  const [filteredMCQs, setFilteredMCQs] = useState([]);
  const [testSet, setTestSet] = useState();

  const getSelection = (sets) => {
    console.log("finding all", mcq);
    const filteredSet = mcq?.filter((mcqSet) => mcqSet.question_set === sets);
    console.log("AnswerPage: ", filteredSet);
    setFilteredMCQs(filteredSet);
    setTestSet(sets);
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen p-6 text-black"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg")',
      }}
    >
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <QuestionSetButtons onSetSelect={getSelection} />
        <Link to="/tests">
          <button className="w-full sm:w-[150px] md:w-[200px] bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition">
            Back to Tests
          </button>
        </Link>
      </div>

      <section className="flex flex-col items-center justify-center">
        <div className="bg-teal-500 p-4 rounded-lg w-full max-w-3xl mb-6">
          <h2 className="text-center text-white font-semibold text-xl md:text-2xl">
            Answers ({testSet})
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl px-4">
          {filteredMCQs.map((answers, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2">
                {answers.question_set}/{answers.id}: Question {index + 1}
              </h3>
              <p className="text-sm mb-4 text-black">{answers.question}</p>
              <p className="text-sm font-semibold">
                <span className="font-bold">Answer:</span>{" "}
                {answers.correct_answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Answers;
