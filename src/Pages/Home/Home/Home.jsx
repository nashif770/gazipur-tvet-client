import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="relative overflow-auto h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg")',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center p-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-white mb-6">
          Welcome to Your Test
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white mb-10">
          Let's dive in and test your mettle!
        </p>
        <Link to="/tests">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg transition duration-300 ease-in-out mb-4">
            Start Now
          </button>
        </Link>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white mb-6">
          Click the links below
        </p>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 w-full max-w-md">
          <div className="flex flex-col items-center bg-white rounded-md p-4">
            <a
              href="https://drive.google.com/drive/folders/1YN-N4qxWbvTeyCJwWEgrsG0eaMWgZnuA?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-semibold text-blue-600 hover:underline"
            >
              Google Drive
            </a>
          </div>
          <div className="flex flex-col items-center bg-white rounded-md p-4">
            <a
              href="https://rededge.is-a.dev/Keyboard-Hero/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-semibold text-blue-600 hover:underline"
            >
              Keyboard Practice
            </a>
          </div>
          <div className="flex flex-col items-center bg-white rounded-md p-4">
            <a
              href="https://monkeytype.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-semibold text-blue-600 hover:underline"
            >
              Typing Practice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
