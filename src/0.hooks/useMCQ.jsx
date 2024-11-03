import React, { useContext } from "react";
import { AuthContext } from "../0.providers/AuthProvider";
import { useQuery } from "react-query";

const useMCQ = () => {
  const {
    isLoading,
    refetch,
    isError,
    data: mcq = [],
    error,
  } = useQuery("questions", async () => {
    const response = await fetch("mcq.json");
    return response.json();
  });

  return [mcq, refetch];
};

export default useMCQ;
