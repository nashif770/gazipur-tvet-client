import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen">
      <img
        src={
          "https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg"
        }
        className="object-cover w-full h-full"
        alt=""
      />
      <Link
        to="/tests"
        className="absolute inset-0 flex items-center justify-center text-6xl md:text-5xl lg:text-3xl"
      >
        <div className="flex items-center justify-center  font-bold text-white btn btn-primary p-3">
          Click For Test
        </div>
      </Link>
    </div>
  );
};

export default Home;
