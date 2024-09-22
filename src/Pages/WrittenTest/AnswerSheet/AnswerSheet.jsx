import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AnswerSheet = () => {
  const { setTitle } = useParams(); // Get the title from the URL
  const [questionSet, setQuestionSet] = useState(null);
  const [answers, setAnswers] = useState({}); // State to hold answers
  const [username, setUsername] = useState(""); // State for username

  useEffect(() => {
    const fetchQuestionSet = async () => {
      try {
        const response = await fetch(`http://localhost:5000/questions`);
        const data = await response.json();
        const selectedSet = data.find((set) => set.title === setTitle);
        setQuestionSet(selectedSet);
      } catch (error) {
        console.error("Error fetching question set:", error);
      }
    };

    fetchQuestionSet();
  }, [setTitle]);

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value }); // Update answers state
  };

  const handleSubmitAnswers = async () => {
    // Submit answers to the backend
    try {
      const response = await fetch(`http://localhost:5000/submitAnswers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: setTitle,
          answers,
          username, // Include the username in the submission
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          day: new Date().toLocaleString("en-US", { weekday: "long" }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit answers");
      }

      const result = await response.json();
      console.log("Answers submitted successfully:", result);
      alert("Your answers have been submitted!");
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("There was an error submitting your answers.");
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">{setTitle}</h2>

      {/* Input for username */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="mb-4 p-2 border border-gray-400 rounded w-full"
      />

      {questionSet &&
        questionSet.selectedQuestions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">
              {index + 1}. {question}
            </p>
            <textarea
              rows="4"
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Type your answer here..."
            />
          </div>
        ))}
      <button
        onClick={handleSubmitAnswers}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default AnswerSheet;
