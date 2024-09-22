import React, { useState } from "react";
import useShortQuestions from "../../0.hooks/useShortQuestions";

const QuestionCreator = () => {
  const [shortQuestions] = useShortQuestions(); // Fetch all questions
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [title, setTitle] = useState(""); // New state for question set title

  // Handler to select/unselect questions
  const toggleQuestionSelection = (question) => {
    if (selectedQuestions.includes(question)) {
      // Unselect the question if already selected
      setSelectedQuestions(selectedQuestions.filter((q) => q !== question));
    } else {
      // Select the question if less than 10 are selected
      if (selectedQuestions.length < 10) {
        setSelectedQuestions([...selectedQuestions, question]);
      } else {
        alert("You can select up to 10 questions only.");
      }
    }
  };

  // Submit selected questions and title to the backend
  const handleSubmit = async () => {
    if (selectedQuestions.length > 0 && title.trim() !== "") {
      try {
        // Extract only the questions (without answers)
        const questionsOnly = selectedQuestions.map((q) => q.question);

        // Make an API call to send data to the backend
        await fetch("http://localhost:5000/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, selectedQuestions: questionsOnly }),
        });

        alert("Questions submitted successfully!");
        setTitle(""); // Clear title after submission
        setSelectedQuestions([]); // Clear selected questions after submission
      } catch (error) {
        console.error("Error submitting questions:", error);
      }
    } else {
      alert("Please provide a title and select at least one question.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select Questions (Max 10)</h2>

      {/* Input field for the title of the question set */}
      <input
        type="text"
        placeholder="Enter question set title (Add date)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-2 border border-gray-400 rounded w-full"
      />

      {/* Display the number of selected questions */}
      <p className="mb-4 text-white">
        Selected Questions: {selectedQuestions.length} / 10
      </p>

      <div className="grid grid-cols-1 gap-4 max-w-[600px] m-auto">
        {shortQuestions.questions?.map((question, index) => (
          <div
            key={index}
            onClick={() => toggleQuestionSelection(question)}
            className={`rounded-lg shadow-md p-6 cursor-pointer ${
              selectedQuestions.includes(question)
                ? "bg-green-200 border-green-500"
                : "bg-gray-300"
            }`}
          >
            <p className="text-lg font-semibold mb-2 text-gray-900">
              {index + 1}. {question.question}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          className={`${
            selectedQuestions.length === 0 || title.trim() === ""
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 px-4 rounded`}
          onClick={handleSubmit}
          disabled={selectedQuestions.length === 0 || title.trim() === ""}
        >
          Submit Selected Questions
        </button>
      </div>
    </div>
  );
};

export default QuestionCreator;
