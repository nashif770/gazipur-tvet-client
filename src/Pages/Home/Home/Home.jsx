import React from "react";
import { Link } from "react-router-dom";
import DownloadButton from "../../Shared/DownloadButton";

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
        <p className="text-lg md:text-xl lg:text-2xl text-white m-10">
          Download PDF
        </p>
        <div className="flex flex-wrap justify-center">
          <DownloadButton buttonName="MCQ Level 3" download="copMcqL3.pdf" />
          <DownloadButton buttonName="Practical L1" download="copL1.pdf" />
          <DownloadButton buttonName="Practical 3" download="copPracL3.pdf" />
        </div>
      </div>
    </div>
  );
};

export default Home;
