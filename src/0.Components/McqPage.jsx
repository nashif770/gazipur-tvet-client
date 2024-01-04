import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../0.providers/AuthProvider";
import QuizCards from "./QuizCards";

const McqPage = ({ questions, mainUser, testSet }) => {
  const [answers, setAnswers] = useState([]);
  const { user } = useContext(AuthContext);
  const currentDate = new Date();

  useEffect(() => {}, []);

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
    const answerCollection = answers?.map((answer) => answer.answer);
    console.log("answer collection", answerCollection);
    if (userConfirmed && answerCollection.length > 0) {
      console.log("User confirmed");
      const result = questions?.filter((question) =>
        answerCollection.includes(question.correct_answer)
      );

      const resultHistory = {
        result: result.length,
        userName: mainUser?.name,
        userEmail: mainUser?.email,
        set: testSet,
        createdAt: {
          date: currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: currentDate.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }),
        },
      };

      console.log(resultHistory);
      fetch("http://localhost:5000/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resultHistory }),
      });
      swal({
        title: "Congrats",
        text: `You Managed to get ( ${result.length} ) correct answers`,
        icon: "success",
        button: "Procced",
      }).then(() => {
        // Reload the page
        // window.location.reload();
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
    <div className="flex flex-col md:w-full m-auto">
      <div className="m-auto w-full md:w-1/2">
        <h2 className="text-center font-bold p-3 bg-red-500 text-white w-1/2 m-auto rounded-xl text-2xl">
          {questions.length} Questions
        </h2>
        {questions.map((question, index) => (
          <QuizCards
            key={index}
            question={question}
            id={`${index + 1}`}
            getAnswers={getAnswers}
          ></QuizCards>
        ))}
      </div>
      { questions.length>0 && 
        <button
        className="btn btn-primary w-1/2 m-auto my-3"
        type="submit"
        onClick={answerSubmit}
      >
        Submit Answers
      </button>}
    </div>
  );
};

export default McqPage;
