import React from "react";
import useMCQ from "../0.hooks/useMCQ";

const QuestionSetButtons = ({ onSetSelect }) => {
  const [mcq] = useMCQ();

  const uniqueQuestionSets = Array.from(
    new Set(mcq.map((item) => item.question_set))
  ).map((set) => ({ set }));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-6 max-w-6xl m-auto">
      {uniqueQuestionSets.map((button, index) => (
        <button
          key={index}
          className="w-full py-4 px-6 bg-white text-black hover:text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
          onClick={() => onSetSelect(button.set)}
        >
          {button.set}
        </button>
      ))}
    </div>
  );
};

export default QuestionSetButtons;
