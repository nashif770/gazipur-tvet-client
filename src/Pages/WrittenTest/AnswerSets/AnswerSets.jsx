import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../../../0.providers/AuthProvider";

const AnswerSets = () => {
  const [questionSets, setQuestionSets] = useState([]); // List of question sets
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(null); // Selected question set
  const [submittedAnswers, setSubmittedAnswers] = useState([]); // List of submitted answers for the selected question set
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch all question sets on component mount
  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await fetch(
          "https://gazipur-tvet-server-1.onrender.com/questions"
        );
        const data = await response.json();

        // Sort question sets by date in descending order (newest first)
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setQuestionSets(sortedData);
      } catch (error) {
        console.error("Error fetching question sets:", error);
      }
    };

    fetchQuestionSets();
  }, []);

  // Fetch all submitted answers
  const fetchSubmittedAnswers = async (title) => {
    try {
      const response = await fetch(
        "https://gazipur-tvet-server-1.onrender.com/submittedAnswers"
      );
      const allAnswers = await response.json();
      // Filter answers for the selected question set title
      const filteredAnswers = allAnswers.filter(
        (answerSheet) => answerSheet.title === title
      );
      setSubmittedAnswers(filteredAnswers);
    } catch (error) {
      console.error("Error fetching submitted answers:", error);
    }
  };

  // Handle selection of a question set
  const handleQuestionSetSelect = (questionSet) => {
    setSelectedQuestionSet(questionSet);
    fetchSubmittedAnswers(questionSet.title);
  };

  // Navigate to the full answers page
  const handleViewAnswers = (answerSheet) => {
    navigate(`/evaluationSheet/${answerSheet.username}`, {
      state: { answerSheet },
    });
  };

  return (
    <div className="p-6 text-white max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">
        Evaluation Sheet
      </h2>

      {/* Step 1: Select Question Set */}
      <h3 className="text-2xl font-semibold mb-6 text-gray-200">
        Select a Question Set:
      </h3>
      <div className="grid grid-cols-1 gap-6 mb-10">
        {questionSets.map((set, index) => (
          <button
            key={index}
            onClick={() => handleQuestionSetSelect(set)}
            className={`transition-all duration-300 transform p-4 rounded-lg text-left w-full shadow-md text-gray-100 font-medium hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 ${
              selectedQuestionSet === set
                ? "bg-blue-600 ring-2 ring-blue-300"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <h4 className="text-xl">{set.title}</h4>
          </button>
        ))}
      </div>

      {/* Step 2: Display all submitted answers */}
      {selectedQuestionSet && (
        <>
          <h3 className="text-2xl font-semibold mb-6 mt-12 text-center text-gray-100">
            Submitted Answers for {selectedQuestionSet.title}:
          </h3>

          {submittedAnswers.length === 0 ? (
            <p className="text-center text-gray-400">
              No answers have been submitted yet for this question set.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {submittedAnswers.map((answerSheet, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleViewAnswers(answerSheet)} // Handle click to view answers
                >
                  <h4 className="text-xl font-semibold mb-2 text-gray-100">
                    Answer Set {index + 1}
                  </h4>
                  <p className="text-gray-300">
                    <span className="font-medium">Name:</span>{" "}
                    {answerSheet.username}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Date:</span>{" "}
                    {answerSheet.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnswerSets;
