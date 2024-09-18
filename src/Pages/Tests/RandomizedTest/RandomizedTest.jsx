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

  const validSets = new Set([
    "Set 1",
    "Set 2",
    "Set 3",
    "Set 4",
    "Set 5",
    "Set 6",
    "Set 7",
    "Set 8",
    "Set 9",
    "Set 10",
    "Set 11",
    "Set 12",
    "Set 13",
    "Set 14",
    "Set 15",
    "Set 16",
    "Set 17",
    "Set 18",
    "Set 19",
  ]);
  //   console.log("Stored users", storedUsers, user)
  const filteredMCQs = mcq?.filter((question) => {
    return validSets.has(question.question_set);
  });

  const mainUser = storedUsers?.find(
    (loggedUser) => loggedUser.email === user.email
  );

  const randomizeQuestions = () => {
    const shuffledMCQs = filteredMCQs?.sort(() => Math.random() - 0.5);
    const selectedMCQs = shuffledMCQs?.slice(0, 20);
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
