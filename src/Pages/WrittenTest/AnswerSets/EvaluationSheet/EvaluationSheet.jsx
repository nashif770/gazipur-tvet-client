import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../0.providers/AuthProvider";

const EvaluationSheet = () => {
  const location = useLocation(); // Get state passed from the previous page
  const navigate = useNavigate();
  const { answerSheet } = location.state; // Destructure the passed answerSheet
  const { user, loading } = useContext(AuthContext);

  // State to track ratings for each individual answer
  const [ratings, setRatings] = useState({}); // Ratings for each answer

  const handleRatingChange = (questionIndex, ratingValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questionIndex]: ratingValue,
    }));
  };

  const handleAllRatingsSubmit = async () => {
    try {
      const response = await fetch(
        "https://gazipur-tvet-server-1.onrender.com/submitRatings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answerSheetId: answerSheet._id, // Send the answerSheetId
            ratings,
          }),
        }
      );

      if (response.ok) {
        alert("Ratings submitted successfully!");
      } else {
        alert("Failed to submit ratings.");
      }
    } catch (error) {
      console.error("Error submitting ratings:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-700 hover:bg-gray-600 p-3 rounded-md mb-8 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 inline-block mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Answer Sets
      </button>

      <h2 className="text-4xl font-extrabold mb-6 text-center">
        Evaluation for{" "}
        <span className="text-blue-500">{answerSheet.username}</span>
      </h2>
      <p className="text-gray-300 mb-8 text-center">
        <span className="font-medium">Date:</span> {answerSheet.date}
      </p>

      <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold mb-6 text-center">Answer Review</h3>

        {/* Display the answers */}
        {answerSheet.answers.map((item, index) => (
          <div key={index} className="mb-8 border-b border-gray-700 pb-6">
            <p className="font-semibold text-xl text-gray-200">
              {index + 1}. {item.question} {/* Render the question */}
            </p>
            <p className="text-gray-400 ml-4 text-lg mt-2">{item.answer}</p>{" "}
            {/* Render the answer */}
            {user ? (
              // If the user is logged in, allow rating submission
              <div className="mt-4">
                <h5 className="text-md font-semibold mb-2 text-gray-300">
                  Rate this Answer:
                </h5>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleRatingChange(index, value)}
                      className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                        ratings[index] === value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // If no user, display the rating if it exists
              <div className="mt-4">
                <h5 className="text-md font-semibold mb-2 text-gray-300">
                  Rating:
                </h5>
                <p className="text-gray-400 ml-4 text-lg">
                  {item.rating ? (
                    <span className="text-green-500 font-semibold">
                      {item.rating}
                    </span>
                  ) : (
                    <span className="text-red-500">Not yet rated</span>
                  )}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Only show submit button if the user is logged in */}
      {user && (
        <div className="text-center mt-10">
          <button
            onClick={handleAllRatingsSubmit}
            className="bg-green-600 hover:bg-green-500 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            disabled={Object.keys(ratings).length === 0} // Disable if no ratings are given
          >
            Submit All Ratings
          </button>
        </div>
      )}
    </div>
  );
};

export default EvaluationSheet;
