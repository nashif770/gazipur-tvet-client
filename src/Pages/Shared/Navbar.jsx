import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../0.providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
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
      {user && (
        <li>
          <Link to="/sessionPlanner">Session Creation</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-lg">
      <div className="navbar-start flex items-center">
        <div className="dropdown mr-4">
          <button className="btn btn-ghost lg:hidden">
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
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-52">
            {navOptions}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl font-bold">
          UGTI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex flex-grow">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end flex items-center">
        {user ? (
          <div className="mr-6">
            <h1 className="text-lg font-semibold">{user.displayName}</h1>
          </div>
        ) : null}
        {user ? (
          <button
            onClick={handleLogOut}
            className="btn btn-primary hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
