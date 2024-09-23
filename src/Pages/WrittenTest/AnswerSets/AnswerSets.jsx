import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../../../0.providers/AuthProvider";

const AnswerSets = () => {
  const [questionSets, setQuestionSets] = useState([]); // List of question sets
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(null); // Selected question set
  const [submittedAnswers, setSubmittedAnswers] = useState([]); // List of submitted answers for the selected question set
  const { user, loading } = useContext(AuthContext);

  console.log("Submitted Answers", submittedAnswers);

  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch all question sets on component mount
  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await fetch(
          "https://gazipur-tvet-server.vercel.app/questions"
        );
        const data = await response.json();
        setQuestionSets(data);
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
        "https://gazipur-tvet-server.vercel.app/submittedAnswers"
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
    <div className="p-4 text-white max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Evaluation Sheet</h2>

      {/* Step 1: Select Question Set */}
      <h3 className="text-xl font-semibold mb-4">Select a Question Set:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questionSets.map((set, index) => (
          <button
            key={index}
            onClick={() => handleQuestionSetSelect(set)}
            className={`transition-all duration-300 transform mb-2 p-4 rounded-lg text-left w-full shadow-md ${
              selectedQuestionSet === set
                ? "bg-blue-600 text-white scale-105"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            <h4 className="text-lg font-medium">{set.title}</h4>
          </button>
        ))}
      </div>

      {/* Step 2: Display all submitted answers */}
      {selectedQuestionSet && (
        <>
          <h3 className="text-xl font-semibold mb-4 mt-8 text-center">
            Submitted Answers for {selectedQuestionSet.title}:
          </h3>

          {submittedAnswers.length === 0 ? (
            <p className="text-center text-gray-400">
              No answers have been submitted yet for this question set.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submittedAnswers.map((answerSheet, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleViewAnswers(answerSheet)} // Handle click to view answers
                >
                  <h4 className="text-lg font-semibold mb-2">
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
