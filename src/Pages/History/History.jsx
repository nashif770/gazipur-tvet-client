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
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg',
      }}
    >
      <table className="table table-xs w-4/6 m-auto text-center bg-purple-500 text-white font-bold">
        <thead>
          <tr className="text-start">
            <th>#</th>
            <th>Name</th>
            <th>Result</th>
            <th>Set</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="">
          {result?.map((history, index) => (
            <tr key={index} className="hover:bg-slate-600">
              <th>{index + 1}</th>
              {user?.email === history.resultHistory?.userEmail ? (
                <td className="text-black bg-green-500">
                  {history?.resultHistory.userName}
                </td>
              ) : (
                <td className="">{history?.resultHistory.userName}</td>
              )}
              <td className={``}>{history.resultHistory?.result}</td>
              <td className={``}>{history.resultHistory?.set}</td>
              <td className={``}>{history.resultHistory?.createdAt.time}</td>
              <td className={``}>{history.resultHistory?.createdAt.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
