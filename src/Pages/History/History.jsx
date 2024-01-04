import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../0.providers/AuthProvider";

const History = () => {
  const [result, setResult] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/result`);
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
    <div className="overflow-x-auto h-screen">
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
            <tr key={index}>
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
