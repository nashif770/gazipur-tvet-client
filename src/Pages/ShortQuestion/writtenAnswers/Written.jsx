import React, { useState } from "react";
import useShortQuestions from "../../../0.hooks/useShortQuestions";

const Written = () => {
  const [shortQuestions] = useShortQuestions();
  const [studentAnswers, setStudentAnswers] = useState({});
  const [percentages, setPercentages] = useState({});
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("All");

  const handleInputChange = (event, id) => {
    setStudentAnswers({
      ...studentAnswers,
      [id]: event.target.value,
    });
  };

  const evaluateAnswers = () => {
    const newPercentages = {};
    randomQuestions.forEach((question) => {
      const studentAnswer = studentAnswers[question.id]?.toLowerCase() || "";
      const keywordMatches = question.keywords.filter((keyword) =>
        studentAnswer.includes(keyword.toLowerCase())
      );
      const percentage =
        (keywordMatches.length / question.keywords.length) * 100;
      newPercentages[question.id] = percentage;
    });
    setPercentages(newPercentages);
    setSubmitted(true);
  };

  const getRandomQuestions = () => {
    if (!shortQuestions || !shortQuestions.questions) return;

    // Filter questions based on the selected unit
    const filteredQuestions =
      selectedUnit === "All"
        ? shortQuestions.questions
        : shortQuestions.questions.filter(
            (question) => question.unit === selectedUnit
          );

    // Shuffle and pick 10 random questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    setRandomQuestions(selected);
    setPercentages({});
    setStudentAnswers({});
    setSubmitted(false);
  };

  const units = [
    "All",
    "MS Word",
    "MS PowerPoint",
    "MS Excel",
    "Troubleshooting",
    "Operate Computer",
  ];

  if (!shortQuestions || !shortQuestions.questions) {
    return (
      <div className="text-center text-lg font-medium py-8">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        Answer the Questions
      </h1>

      {/* Unit Filter Buttons */}
      <div className="mb-6">
        {units.map((unit) => (
          <button
            key={unit}
            onClick={() => setSelectedUnit(unit)}
            className={`px-4 py-2 mx-2 rounded ${
              selectedUnit === unit
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {unit}
          </button>
        ))}
      </div>

      {/* Get Random Questions Button */}
      <button
        className="mb-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        onClick={getRandomQuestions}
      >
        Get Random Questions
      </button>

      {/* Questions Display */}
      <section className="grid grid-cols-1 gap-6 p-3">
        {randomQuestions.map((question) => {
          const percentage = percentages[question.id];
          const percentageClass =
            percentage !== undefined && percentage < 50
              ? "text-red-600"
              : "text-green-600";

          return (
            <div
              key={question.id}
              className="rounded-lg shadow-md p-6 bg-gray-100"
            >
              <p className="text-lg font-semibold mb-2 text-gray-900">
                {question.id}. {question.question}
              </p>
              <textarea
                className="w-full mt-2 p-2 border rounded-lg"
                placeholder="Write your answer here..."
                value={studentAnswers[question.id] || ""}
                onChange={(e) => handleInputChange(e, question.id)}
                disabled={submitted}
              />
              {submitted && (
                <>
                  <p className={`${percentageClass} mt-2`}>
                    Correctness: {percentage.toFixed(1)}%
                  </p>
                  <p className="mt-2 text-gray-700">
                    <strong>Keywords: </strong>
                    {question.keywords.join(", ")}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </section>

      {/* Submit Button */}
      {randomQuestions.length > 0 && !submitted && (
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={evaluateAnswers}
        >
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default Written;
