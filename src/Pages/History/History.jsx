import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../0.providers/AuthProvider";

const questionSets = [
  { set: "Set 1" },
  { set: "Set 2" },
  { set: "Set 3" },
  { set: "Set 4" },
  { set: "Set 5" },
  { set: "Set 6" },
  { set: "Set 7" },
  { set: "Set 8" },
];

const History = () => {
  const [allResult, setAllResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gazipur-tvet-server.vercel.app/result`
        );
        const data = await response.json();
        setAllResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getSelection = (sets) => {
    const filteredSet = allResult?.filter(
      (mcqSet) => mcqSet.resultHistory.set === sets
    );
    const sortedFilteredSet = filteredSet.sort((a, b) => {
      const dateA = new Date(b.resultHistory.createdAt.date);
      const dateB = new Date(a.resultHistory.createdAt.date);
      return dateA - dateB;
    });
    setFilteredResult(sortedFilteredSet);
  };

  return (
    <div>
      <h1 className="text-4xl lg:text-4xl font-bold m-8 text-white text-center">
        Check Out Your Result
      </h1>
      <div className="flex m-auto flex-wrap justify-center">
        {questionSets.map((button, index) => (
          <button
            key={index}
            className="btn btn-primary w-full sm:w-[100px] m-2 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => getSelection(button?.set)}
          >
            {button?.set}
          </button>
        ))}
      </div>
      <div className="w-full max-w-4xl mx-auto px-4">
        <table className="table-auto w-full text-center bg-purple-500 text-white font-bold shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-700">
              <th className="py-3">#</th>
              <th className="py-3">Name</th>
              <th className="py-3">Result</th>
              <th className="py-3">Set</th>
              <th className="py-3">Time</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredResult?.map((history, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-purple-800" : "bg-purple-600"}
              >
                <td className="py-3 ps-3">{index + 1}</td>
                <td className="py-3 text-start ps-3">
                  {history?.resultHistory.userName}
                </td>
                {history.resultHistory?.result < 24 ? (
                  <td className="py-3  text-red-400">{history.resultHistory?.result}</td>
                ) : (
                  <td className="py-3 ">{history.resultHistory?.result}</td>
                )}
                <td className="py-3">{history.resultHistory?.set}</td>
                <td className="py-3">
                  {history.resultHistory?.createdAt.time}
                </td>
                <td className="py-3">
                  {history.resultHistory?.createdAt.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
