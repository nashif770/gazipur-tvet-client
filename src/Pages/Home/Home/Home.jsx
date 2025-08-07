import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../0.providers/AuthProvider";

const button = [
  {
    name: "Word Practice",
    url: "https://drive.google.com/drive/u/1/folders/1L9Bo2UU-5fZ0FHvAieoCWdAJY15CG2FO",
  },
  {
    name: "Excel Practice",
    url: "https://drive.google.com/drive/u/1/folders/16nEBzvodsEQ9CgjkahdeRpd23EUJFKnP",
  },
  {
    name: "PowerPoint Practice",
    url: "https://drive.google.com/drive/u/1/folders/1bXfvxLf-5yQeWiM38bJSwi7B38X8Dl8S",
  },
  { name: "Typing Practice", url: "https://monkeytype.com/" },
];

const Home = () => {
  const { user } = useContext(AuthContext);
  const [customMessage, setCustomMessage] = useState("");
  const [messageOfTheDay, setMessageOfTheDay] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API call abstraction
  const fetchMessage = async (abortController) => {
    try {
      const response = await fetch(
        "https://gazipur-tvet-server-1.onrender.com/motd",
        {
          signal: abortController?.signal,
        }
      );
      if (!response.ok) throw new Error("Failed to fetch message");
      const data = await response.json();
      setMessageOfTheDay(data.message);
      setError("");
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to load message. Please try again later.");
        console.error("Fetch error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const submitMessage = async () => {
    if (!customMessage.trim()) return;

    try {
      const response = await fetch(
        "https://gazipur-tvet-server-1.onrender.com/motd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if required
            ...(user?.token && { Authorization: `Bearer ${user.token}` }),
          },
          body: JSON.stringify({ message: customMessage }),
        }
      );

      if (!response.ok) throw new Error("Submission failed");
      await fetchMessage();
      setCustomMessage("");
      alert("Message submitted successfully!");
    } catch (err) {
      setError("Failed to submit message. Please try again.");
      console.error("Submission error:", err);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchMessage(abortController);
    return () => abortController.abort();
  }, []);

  return (
    <div className="relative overflow-auto bg-cover bg-center min-h-screen">
      <div className="flex flex-col items-center justify-center text-center p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Welcome to Computer Operation Test Website
          </h1>
          <p className="text-lg sm:text-xl text-white">Let's dive in</p>
        </div>

        {/* Main Test Button */}
        <div className="flex justify-center gap-10">
          <Link to="/tests" className="mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              RTO Candidate Test
            </button>
          </Link>
          <Link to="/rplpage" className="mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              "RPL" Candidate Test
            </button>
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
          {button.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-300"
            >
              <span className="text-blue-600 font-medium hover:text-blue-800">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        {/* Message of the Day Section */}
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            Message of the Day
          </h2>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
            {user?.email && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  aria-label="Message input field"
                />
                <button
                  onClick={submitMessage}
                  disabled={!customMessage.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Submit Message
                </button>
              </div>
            )}

            <div className="space-y-4">
              {loading ? (
                <div className="text-gray-600">Loading message...</div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : (
                <>
                  <p className="text-gray-800 text-lg break-words">
                    {messageOfTheDay || "No message available today"}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(messageOfTheDay);
                      alert("Copied to clipboard!");
                    }}
                    disabled={!messageOfTheDay}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    aria-label="Copy message to clipboard"
                  >
                    Copy Message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
