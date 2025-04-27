import React, { useContext } from "react";

const QuizCards = ({ question, id, getAnswers, rpl }) => {
  const handleOptionChange = (option) => {
    const answeredQuestion = {
      question_id: question.id,
      question_set: question.question_set,
      question: question.question,
      answer: option,
    };

    // console.log("quiz card 12", answeredQuestion);

    getAnswers(answeredQuestion);
  };

  return (
    <div className="bg-gray-700 rounded-lg m-3 p-3">
      {!rpl ? (
        <h3 className="text-lg text-white font-bold border bg-teal-500 border-none p-2 rounded-lg mb-4">
          {question?.question_set}/{question.id} - Question {id} :{" "}
          {question.question}
        </h3>
      ) : (
        <h3 className="text-lg text-white font-bold border bg-teal-500 border-none p-2 rounded-lg mb-4">
          Question {id} : {question.question}
        </h3>
      )}
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
