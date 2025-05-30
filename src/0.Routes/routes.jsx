import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../0.Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login&Registration/Login";
import Registration from "../Pages/Login&Registration/Registration";
import Tests from "../Pages/Tests/Tests";
import RandomizedTest from "../Pages/Tests/RandomizedTest/RandomizedTest";
import Answers from "../Pages/Tests/Answers";
import ShortQuestion from "../Pages/ShortQuestion/ShortQuestion";
import Written from "../Pages/ShortQuestion/writtenAnswers/Written";
import Videos from "../Pages/Videos/Videos";
import RplPage from "../Pages/RplPage/RplPage";

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
        element: <Tests></Tests>,
      },
      {
        path: "randomized",
        element: <RandomizedTest></RandomizedTest>,
      },
      {
        path: "answers",
        element: <Answers></Answers>,
      },
      {
        path: "shortQuestions",
        element: <ShortQuestion></ShortQuestion>,
      },
      {
        path: "videos",
        element: <Videos></Videos>,
      },
      {
        path: "written",
        element: <Written></Written>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
      {
        path: "rplpage",
        element: <RplPage></RplPage>,
      },
    ],
  },
]);
