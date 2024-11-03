import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../0.providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Handle successful logout
      })
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/tests">Tests</Link>
      </li>
      <li>
        <Link to="/shortQuestions">Short Questions</Link>
      </li>
      <li>
        <Link to="/writtenTest">Written Test</Link>
      </li>
      <li>
        <Link to="/answerSets">Check Tests</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/questionCreator">Question Creator</Link>
          </li>
          <li>
            <Link to="/answerSets">Evaluation</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-lg">
      <div className="navbar-start">
        {/* Dropdown for mobile view */}
        <div className="dropdown bg-white">
          <button tabIndex={0} className="btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-100 text-black mt-3 z-50 p-2 shadow-lg bg-base-500 rounded-lg w-52"
          >
            {navOptions}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
          TVET
        </Link>
      </div>

      {/* Navigation Links for larger screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <div className="mr-4">
              <span className="text-lg font-semibold">
                {user.displayName || "User"}
              </span>
            </div>
            <button
              onClick={handleLogOut}
              className="btn btn-primary hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
