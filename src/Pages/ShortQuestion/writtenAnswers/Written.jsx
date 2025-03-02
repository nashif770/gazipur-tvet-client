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
      const studentAnswer =
        studentAnswers[question.id]?.trim().toLowerCase() || "";
      const correctAnswer = question.answer?.en?.trim().toLowerCase() || ""; // Assuming English answer

      if (!correctAnswer) {
        newPercentages[question.id] = 0; // No answer available
        return;
      }

      // Calculate similarity percentage
      const similarity = getSimilarityPercentage(studentAnswer, correctAnswer);
      newPercentages[question.id] = similarity;
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

  const getSimilarityPercentage = (studentAnswer, correctAnswer) => {
    const editDistance = levenshteinDistance(studentAnswer, correctAnswer);
    const maxLength = Math.max(studentAnswer.length, correctAnswer.length);

    if (maxLength === 0) return 100; // Both answers are empty, consider it 100% correct

    return ((maxLength - editDistance) / maxLength) * 100;
  };

  const levenshteinDistance = (a, b) => {
    const matrix = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // Deletion
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j - 1] + cost // Substitution
        );
      }
    }

    return matrix[a.length][b.length];
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
