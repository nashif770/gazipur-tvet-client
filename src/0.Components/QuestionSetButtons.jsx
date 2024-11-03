import React from "react";

const questionSets = [
  { set: "Set 1" },
  { set: "Set 2" },
  { set: "Set 3" },
  { set: "Set 4" },
  { set: "Set 5" },
  { set: "Set 6" },
  { set: "Set 7" },
  { set: "Set 8" },
  { set: "Set 9" },
  { set: "Set 10" },
  { set: "Set 11" },
  { set: "Set 12" },
  { set: "Set 13" },
  { set: "Set 14" },
  { set: "Set 15" },
  { set: "Set 16" },
  { set: "Set 17" },
  { set: "Set 18" },
  { set: "Set 19" },
  { set: "Set 20" },
  { set: "Set 21" },
  { set: "Set 22" },
  { set: "Set 23" },
  { set: "Set 24" },
  { set: "Set 25" },
];

const QuestionSetButtons = ({ onSetSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-6 max-w-6xl m-auto">
      {questionSets.map((button, index) => (
        <button
          key={index}
          className="w-full py-4 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
          onClick={() => onSetSelect(button.set)}
        >
          {button.set}
        </button>
      ))}
    </div>
  );
};

export default QuestionSetButtons;
