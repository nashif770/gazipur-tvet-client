import React, { useState, useEffect } from "react";
import { AuthContext } from "../0.providers/AuthProvider";
import QuizCards from "./QuizCards";
import swal from "sweetalert"; // Assuming you're using SweetAlert for alerts

const McqPage = ({ questions }) => {
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null); // Track when the quiz starts
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  // This will reset the timer and answers when the set of questions changes
  useEffect(() => {
    setStartTime(null); // Reset the start time
    setTimer(300); // Reset timer to 5 minutes
    setAnswers([]); // Reset answers
  }, [questions]); // Dependency on questions, so the timer and answers reset when questions change

  const getAnswers = (data) => {
    // Start the timer when the user clicks an answer for the first time
    if (startTime === null) {
      setStartTime(Date.now());
    }

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
    }
  };

  useEffect(() => {
    // Set up the timer countdown
    if (startTime !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); // Decrease the timer by 1 second
      }, 1000);

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    } else if (timer === 0) {
      // When timer reaches 0, automatically submit the form
      answerSubmit(true); // Call answerSubmit with 'true' to trigger prompt
    }
  }, [timer, startTime]); // Run this effect when the timer or startTime changes

  const answerSubmit = (autoSubmit = false) => {
    // If autoSubmit is true, we won't show the confirmation prompt, just submit the answers
    if (!autoSubmit) {
      const userConfirmed = window.confirm("Are you sure you want to submit?");
      if (!userConfirmed) return; // If the user doesn't confirm, return early
    }

    const answerCollection = answers?.map((answer) => ({
      answer: answer.answer,
      id: answer.question_id,
    }));

    if (answerCollection.length > 0) {
      const result = questions?.filter((question) => {
        const userAnswer = answerCollection.find(
          (answer) => answer.id === question.id
        );
        return userAnswer && userAnswer.answer === question.correct_answer;
      });

      swal({
        title: "Congrats",
        text: `You managed to get ( ${result.length} ) out of ${questions.length} questions correct`,
        icon: "success",
        button: "Proceed",
      }).then(() => {
        // Reload the page or redirect
        window.location.href = "/";
      });
    } else {
      swal({
        title: "Don't Be Shy",
        text: `Just choose answers`,
        icon: "warning",
        button: "Proceed",
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto px-4 min-h-screen relative">
      {/* Timer at the bottom-right, sticky */}
      <div
        className="absolute bottom-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg"
        style={{
          position: "fixed", // Make the timer sticky
          bottom: "10px", // Pin to the bottom of the screen
          right: "10px", // Pin to the right of the screen
        }}
      >
        {Math.floor(timer / 60)}:
        {timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}
      </div>

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
          onClick={() => answerSubmit()} // Trigger confirmation prompt on button click
        >
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default McqPage;
