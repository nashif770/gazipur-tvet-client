import React, { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../0.providers/AuthProvider";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    refetch,
    isError,
    data: storedUsers = [],
    error,
  } = useQuery("storedUsers", async () => {
    const response = await fetch("https://gazipur-tvet-server.vercel.app/users");
    return response.json();
  });

  return [storedUsers, refetch];
};

export default useUser;
