import React, { useContext } from "react";
import { AuthContext } from "../0.providers/AuthProvider";

const QuizCards = ({ question, id, getAnswers }) => {
  const { user } = useContext(AuthContext);

  const handleOptionChange = (option) => {
    const answeredQuestion = {
      question_set: question.question_set,
      user_name: user.displayName,
      question: question.question,
      answer: option,
    };

    getAnswers(answeredQuestion);
  };

  return (
    <div className="bg-gray-700 rounded-lg m-3 p-3">
  <h3 className="text-lg w-full border bg-teal-500 border-none p-2 rounded-lg text-white">
    <span className="font-bold">Question({id})-{question.question_set}:</span>{" "}
    <span className="text-white">{question.question}</span>
  </h3>
  <div className="w-full mt-4">
    {question.options.map((option, index) => (
      <div key={index}>
        <div className="flex items-center border shadow-lg p-3 my-3 w-5/6 rounded-lg placeholder border-none bg-blue-500 text-white">
          <input
            type="radio"
            name={`question_${id + 1}`}
            id={`option_${id}_${index}`}
            onChange={() => handleOptionChange(option)}
            className="mr-4"
          />
          <label htmlFor={`option_${id}_${index}`} className="text-xl font-semibold cursor-pointer">
            {option}
          </label>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default QuizCards;
