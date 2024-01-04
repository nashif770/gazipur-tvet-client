import React, { useContext, useEffect, useState } from "react";
import useMCQ from "../../../0.hooks/useMCQ";
import { Link } from "react-router-dom";
import McqPage from "../../../0.Components/McqPage";
import { AuthContext } from "../../../0.providers/AuthProvider";
import useUser from "../../../0.hooks/useUser";

const RandomizedTest = () => {
  const [mcq] = useMCQ();
  const [randomMCQs, setRandomMCQs] = useState([]);
  const { user } = useContext(AuthContext);
  const [storedUsers] = useUser();

  //   console.log("Stored users", storedUsers, user)

  const mainUser = storedUsers?.find(
    (loggedUser) => loggedUser.email === user.email
  );

  const randomizeQuestions = () => {
    const shuffledMCQs = mcq?.sort(() => Math.random() - 0.5);
    const selectedMCQs = shuffledMCQs?.slice(0, 30);
    setRandomMCQs(selectedMCQs);
  };

  return (
    <div
      className="bg-cover bg-center p-3 min-h-screen"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg',
      }}
    >
      <div className="flex justify-center gap-3 p-3">
        <div className="flex justify-start">
          <Link to={"/tests"}>
            <button className="btn bg-red-700 border-none text-white w-[100px]">
              Back to Tests
            </button>
          </Link>
        </div>
        <button className="btn btn-primary" onClick={randomizeQuestions}>
          Click to Get Randomized Questions
        </button>
      </div>
      <section>
        <div className="bg-teal-600 p-6 m-2">
          <h2 className="text-center text-white font-bold text-3xl m-auto">
            Take <span className="">Randomized</span> Test
          </h2>
        </div>
        <McqPage questions={randomMCQs} mainUser={mainUser}></McqPage>
      </section>
    </div>
  );
};

export default RandomizedTest;
