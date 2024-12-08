import React, { useContext } from "react";
import { AuthContext } from "../0.providers/AuthProvider";
import { useQuery } from "react-query";

const useShortQuestions = () => {
  // const {user} = useContext(AuthContext);
  const {
    isLoading,
    refetch,
    isError,
    data: shortQuestions = [],
    error,
  } = useQuery("questions", async () => {
    const response = await fetch("shortQuestion.json");
    return response.json();
  });

  return [shortQuestions, refetch];
};

export default useShortQuestions;
