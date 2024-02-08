import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src="https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg"
        className="object-cover w-full h-full"
        alt="Background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6">
          Welcome to Your Test
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-10">
          Are you ready to challenge yourself?
        </p>
        <Link to="/tests">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out">
            Start Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
