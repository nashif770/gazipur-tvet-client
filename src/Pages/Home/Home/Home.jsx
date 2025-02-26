import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../0.providers/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext); // Get the user context
  const [customMessage, setCustomMessage] = useState(""); // State for the input
  const [messageOfTheDay, setMessageOfTheDay] = useState(""); // State for the fetched message

  // Fetch the Message of the Day from the backend
  const fetchMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/motd");
      if (!response.ok) throw new Error("Failed to fetch the message");
      const data = await response.json();
      setMessageOfTheDay(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  // Submit the custom message to the backend
  const submitMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/motd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: customMessage }),
      });
      if (!response.ok) throw new Error("Failed to submit the message");
      await fetchMessage(); // Refresh the message after submission
      setCustomMessage(""); // Clear the input
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  // Load the message when the component mounts
  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="relative overflow-auto bg-cover bg-center">
      <div className="flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-white mb-6">
          Welcome to TVET Test
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white mb-10">
          Let's dive in
        </p>
        <Link to="/tests">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg transition duration-300 ease-in-out mb-4">
            Start Test
          </button>
        </Link>

        {/* Message of the Day */}

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white mb-6">
          Click the links below
        </p>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full max-w-md">
          {[
            {
              name: "Google Drive",
              url: "https://drive.google.com/drive/folders/1YN-N4qxWbvTeyCJwWEgrsG0eaMWgZnuA?usp=sharing",
            },
            {
              name: "Student Form",
              url: "https://forms.gle/5vo44MAanrWsTpXC8",
            },
            {
              name: "Keyboard Practice",
              url: "https://rededge.is-a.dev/Keyboard-Hero/",
            },
            {
              name: "Typing Practice",
              url: "https://monkeytype.com/",
            },
          ].map((link, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-md p-4"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-semibold text-blue-600 hover:underline"
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Message of the Day
          </h2>
          <div className="bg-white bg-opacity-90 text-black rounded-lg p-4 mb-6 shadow-md w-full">
            {user && (
              <div>
                <input
                  type="text"
                  placeholder="Type your message of the day..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full p-2 mb-4 border rounded bg-white"
                />
                <button
                  onClick={submitMessage}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Submit
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-4 flex-col">
              <p className="text-base sm:text-xl">
                {messageOfTheDay || "No message of the day available"}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(messageOfTheDay);
                  alert("Message copied to clipboard!");
                }}
                className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-1 px-4 rounded"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
