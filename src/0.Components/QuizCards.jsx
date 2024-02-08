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
      <h3 className="text-lg text-white font-bold border bg-teal-500 border-none p-2 rounded-lg mb-4">
        Question {id + 1}: {question.question}
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name={`question_${id + 1}`}
              id={`option_${id}_${index}`}
              onChange={() => handleOptionChange(option)}
              className="mr-4 appearance-none w-6 h-6 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-none focus:outline-none"
            />
            <label
              htmlFor={`option_${id}_${index}`}
              className="text-base text-white cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCards;
