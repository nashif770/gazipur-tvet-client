import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMCQ from "../../0.hooks/useMCQ";
import QuestionSetButtons from "../../0.Components/QuestionSetButtons";

const Answers = () => {
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

  console.log(filteredMCQs)

  return (
    <div className="min-h-screen flex flex-col items-center  text-black">
      {/* Navigation & Selection */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold m-6">
        Go Back to Take Test
      </h1>
      <div className="w-full max-w-3xl text-center mt-3">
        <Link to="/tests">
          <button className="w-full sm:w-[150px] md:w-[200px] bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition">
            Back to Tests
          </button>
        </Link>
      </div>

      {/* Question Set Selection */}
      <QuestionSetButtons onSetSelect={getSelection} />

      {/* Answer Section */}
      {testSet && (
        <section className="w-full max-w-5xl mt-2">
          <div className="bg-teal-600 p-4 rounded-lg text-center text-white font-bold text-xl md:text-2xl">
            Answers ({testSet})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4">
            {filteredMCQs.length > 0 ? (
              filteredMCQs.map((answers, index) => (
                <div
                  key={index}
                  className=" bg-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold mb-2">
                    {answers.question_set}/{answers.id}: Question {index + 1}:
                  </h3>
                  <p className="text-sm mb-4 text-gray-800">
                    {answers.question}
                  </p>
                  <p className="text-sm font-semibold">
                    <span className="font-bold">Answer:</span>{" "}
                    {answers.correct_answer}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 col-span-full">
                No questions available for this set.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Answers;
