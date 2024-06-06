import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative overflow-hidden h-screen">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6">
          Welcome to Your Test
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-10">
          Let's dive in and test your mettle!
        </p>
        <Link to="/tests">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out mb-4">
            Start Now
          </button>
        </Link>
        <div className=" ">
          <p className="text-lg md:text-xl lg:text-2xl text-white m-2">
            Click the link below
          </p>
          <div className="flex flex-wrap justify-center bg-white rounded-md">
           <a href="https://drive.google.com/drive/folders/1YN-N4qxWbvTeyCJwWEgrsG0eaMWgZnuA?usp=sharing" target="blank" className="w-full">Google Drive</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
