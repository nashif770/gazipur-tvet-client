import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../0.providers/AuthProvider";

const History = () => {
  const [result, setResult] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gazipur-tvet-server.vercel.app/result`);
        const data = await response.json();
        setResult(data);
        console.log("result",data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("result", result);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg")',
      }}
    >
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
            {result?.map((history, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-purple-800" : "bg-purple-600"}
              >
                <td className="py-3 ps-3">{index + 1}</td>
                <td className="py-3 text-start ps-3">{history?.resultHistory.userName}</td>
                <td className="py-3">{history.resultHistory?.result}</td>
                <td className="py-3">{history.resultHistory?.set}</td>
                <td className="py-3">{history.resultHistory?.createdAt.time}</td>
                <td className="py-3">{history.resultHistory?.createdAt.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
