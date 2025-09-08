import React, { useState, useEffect } from "react";
import QuizCards from "./QuizCards";
import swal from "sweetalert";

const McqPage = ({ questions, rpl }) => {
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  const recieveRpl = rpl;

  useEffect(() => {
    setStartTime(null);
    setTimer(300);
    setAnswers([]);
  }, [questions]);

  const getAnswers = (data) => {
    if (startTime === null) {
      setStartTime(Date.now());
    }

    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingIndex = updatedAnswers.findIndex(
        (answer) => answer.question === data.question
      );

      if (existingIndex !== -1) {
        updatedAnswers[existingIndex] = data;
      } else {
        updatedAnswers.push(data);
      }
      return updatedAnswers;
    });
  };

  useEffect(() => {
    if (startTime !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, startTime]);

  useEffect(() => {
    if (timer === 0) {
      answerSubmit(true);
    }
  }, [timer]);

  const answerSubmit = (autoSubmit = false) => {
    if (!autoSubmit) {
      swal({
        title: "Are you sure?",
        text: "Once submitted, you will not be able to change your answers.",
        icon: "warning",
        buttons: ["Cancel", "Yes, Submit"],
        dangerMode: true,
      }).then((willSubmit) => {
        if (willSubmit) {
          processSubmission();
        }
      });
    } else {
      processSubmission();
    }
  };

  const processSubmission = () => {
    const answerCollection = answers.map((answer) => ({
      answer: answer.answer,
      id: answer.question_id,
    }));

    if (answerCollection.length > 0) {
      const correctAnswers = questions.filter((question) => {
        const userAnswer = answerCollection.find(
          (answer) => answer.id === question.id
        );
        return userAnswer && userAnswer.answer === question.correct_answer;
      });

      swal({
        title: "Congrats!",
        text: `You got ${correctAnswers.length} out of ${questions.length} correct!`,
        icon: "success",
        button: "Proceed",
      }).then(() => {
        window.location.href = "https://uceptvet.netlify.app/";
      });
    } else {
      swal({
        title: "Don't Be Shy",
        text: "Please select at least one answer!",
        icon: "warning",
        button: "Proceed",
      });
    }
  };

  const timerColor = timer <= 60 ? "bg-red-500 animate-pulse" : "bg-red-500";

  return (
    <div className="flex flex-col items-center w-full mx-auto px-2 min-h-screen relative text-sm">
      {/* Timer Display - Sticky and Anxiety-Inducing */}
      <div
        className={`fixed top-20 right-4 z-50 py-3 px-6 rounded-xl text-3xl font-bold text-white shadow-lg transition-colors ${timerColor}`}
      >
        <span>
          {Math.floor(timer / 60)}:
          {timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}
        </span>
      </div>

      <div className="w-full md:w-3/4 lg:w-1/2 flex-grow">
        <h2 className="text-center font-semibold py-4 bg-gray-100 text-gray-800 rounded-lg text-sm mb-4 shadow-sm">
          {questions.length} Questions
        </h2>

        {questions.map((question, index) => (
          <QuizCards
            rpl={recieveRpl}
            key={question.id || index}
            question={question}
            id={`${index + 1}`}
            getAnswers={getAnswers}
          />
        ))}
      </div>

      {questions.length > 0 && (
        <button
          className="w-full bg-blue-500 text-white py-3 md:w-3/4 lg:w-1/2 mx-auto rounded-none text-lg font-medium shadow-md hover:bg-blue-600 transition"
          type="submit"
          onClick={() => answerSubmit()}
        >
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default McqPage;
