import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../0.Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login&Registration/Login";
import Registration from "../Pages/Login&Registration/Registration";
import Tests from "../Pages/Tests/Tests";
import RandomizedTest from "../Pages/Tests/RandomizedTest/RandomizedTest";
import Answers from "../Pages/Tests/Answers";
import ShortQuestion from "../Pages/ShortQuestion/ShortQuestion";
import QuestionCreator from "../Pages/QuestionCreator/QuestionCreator";
import WrittenTest from "../Pages/WrittenTest/writtenTest";
import AnswerSheet from "../Pages/WrittenTest/AnswerSheet/AnswerSheet";
import EvaluationSheet from "../Pages/WrittenTest/AnswerSets/EvaluationSheet/EvaluationSheet";
import AnswerSets from "../Pages/WrittenTest/AnswerSets/AnswerSets";

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
        path: "writtenTest",
        element: <WrittenTest></WrittenTest>,
      },
      {
        path: "answerSheet/:setTitle",
        element: <AnswerSheet></AnswerSheet>,
      },
      {
        path: "answerSets",
        element: <AnswerSets></AnswerSets>,
      },
      {
        path: "evaluationSheet/:username",
        element: <EvaluationSheet></EvaluationSheet>,
      },
      {
        path: "questionCreator",
        element: <QuestionCreator></QuestionCreator>,
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
