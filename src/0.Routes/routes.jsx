import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../0.Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login&Registration/Login";
import Registration from "../Pages/Login&Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import Tests from "../Pages/Tests/Tests";
import RandomizedTest from "../Pages/Tests/RandomizedTest/RandomizedTest";
import Answers from "../Pages/Tests/Answers";
import History from "../Pages/History/History";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "tests",
        element: (
          <PrivateRoute>
            <Tests></Tests>
          </PrivateRoute>
        ),
      },
      {
        path: "randomized",
        element: (
          <PrivateRoute>
            <RandomizedTest></RandomizedTest>
          </PrivateRoute>
        ),
      },
      {
        path: "answers",
        element: (
          <PrivateRoute>
            <Answers></Answers>
          </PrivateRoute>
        ),
      },
      {
        path: "history",
        element: (
          <PrivateRoute>
            <History></History>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },

      {
        path: "registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);
