import React from "react";
import useMCQ from "../0.hooks/useMCQ";

const QuestionSetButtons = ({ onSetSelect }) => {
  const [mcq] = useMCQ();

  // Ensure mcq is an array and not undefined or null
  const uniqueQuestionSets = Array.from(
    new Set((Array.isArray(mcq) ? mcq : [])?.map((item) => item.question_set))
  ).map((set) => ({ set }));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-auto h-48 overflow-y-auto">
      {uniqueQuestionSets.map((button, index) => (
        <button
          key={index}
          className="bg-white text-black hover:text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
          onClick={() => onSetSelect(button.set)}
        >
          {button.set}
        </button>
      ))}
    </div>
  );
};

export default QuestionSetButtons;
