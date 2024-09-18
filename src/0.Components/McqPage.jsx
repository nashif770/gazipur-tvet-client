import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../0.providers/AuthProvider";
import QuizCards from "./QuizCards";

const McqPage = ({ questions }) => {
  const [answers, setAnswers] = useState([]);

  const getAnswers = (data) => {
    const matchIndex = answers.findIndex(
      (answer) => answer.question === data.question
    );
    if (matchIndex !== -1) {
      // If the answer already exists, replace it
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[matchIndex] = data;
        return newAnswers;
      });
    } else {
      // If the answer doesn't exist, add it to the answers array
      setAnswers((prevAnswers) => [...prevAnswers, data]);
      console.log("Answer added");
    }
  };

  const answerSubmit = () => {
    const userConfirmed = window.confirm("Are you Sure?");
    const answerCollection = answers?.map((answer) => ({
      answer: answer.answer,
      id: answer.question_id,
    }));
    if (userConfirmed && answerCollection.length > 0) {
      const result = questions?.filter((question) => {
        const userAnswer = answerCollection.find(
          (answer) => answer.id === question.id
        );
        return userAnswer && userAnswer.answer === question.correct_answer;
      });

      console.log("randomized", result);
      swal({
        title: "Congrats",
        text: `You Managed to get ( ${result.length} ) correct answers`,
        icon: "success",
        button: "Procced",
      }).then(() => {
        // Reload the page
        window.location.href = "/";
      });
    } else {
      swal({
        title: "Don't Be Shy",
        text: `just Choose Answers`,
        icon: "success",
        button: "Procced",
      });
    }
  };
  return (
    <div className="flex flex-col items-center w-full mx-auto px-4 min-h-screen">
      <div className="w-full md:w-3/4 lg:w-1/2 flex-grow">
        <h2 className="text-center font-semibold py-4 bg-gray-100 text-gray-800 rounded-lg text-xl mb-4 shadow-sm">
          {questions.length} Questions
        </h2>
        {questions.map((question, index) => (
          <QuizCards
            key={index}
            question={question}
            id={`${index + 1}`}
            getAnswers={getAnswers}
          />
        ))}
      </div>

      {questions.length > 0 && (
        <button
          className="w-full bg-blue-500 text-white py-3 left-0 md:w-3/4 lg:w-1/2 mx-auto rounded-none text-lg font-medium shadow-md hover:bg-blue-600 transition"
          type="submit"
          onClick={answerSubmit}
        >
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default McqPage;
