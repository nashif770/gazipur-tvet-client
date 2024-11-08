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

  // Function to randomly select remaining questions (up to 10)
  const handleRandomSelection = () => {
    const remainingSlots = 10 - selectedQuestions.length;
    if (remainingSlots === 0) {
      alert("You have already selected 10 questions.");
      return;
    }

    const availableQuestions = shortQuestions.questions.filter(
      (q) => !selectedQuestions.includes(q)
    );

    const shuffledQuestions = availableQuestions.sort(
      () => 0.5 - Math.random()
    );
    const randomQuestions = shuffledQuestions.slice(0, remainingSlots);

    setSelectedQuestions([...selectedQuestions, ...randomQuestions]);
  };

  // Auto-generate a title based on the current date and time
  const autoGenerateTitle = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Format: MM/DD/YYYY
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format: HH:MM AM/PM

    const generatedTitle = `Question Set - ${formattedDate} ${formattedTime}`;
    setTitle(generatedTitle); // Set the auto-generated title
  };

  // Submit selected questions and title to the backend
  const handleSubmit = async () => {
    if (selectedQuestions.length > 0 && title.trim() !== "") {
      try {
        // Extract only the questions (without answers)
        const questionsOnly = selectedQuestions.map((q) => q.question);

        // Make an API call to send data to the backend
        await fetch("https://gazipur-tvet-server-1.onrender.com/questions", {
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
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter question set title (Add date)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-400 rounded w-full"
        />
        {/* Button to auto-generate the title */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={autoGenerateTitle}
        >
          Auto-Generate Title
        </button>
      </div>

      {/* Display the number of selected questions */}
      <p className="mb-4 text-white">
        Selected Questions: {selectedQuestions.length} / 10
      </p>

      {/* Button for random selection */}
      <button
        className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        onClick={handleRandomSelection}
        disabled={selectedQuestions.length === 10}
      >
        Randomly Select Remaining Questions
      </button>

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
