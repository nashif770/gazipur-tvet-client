import React, { useContext, useState } from "react";
import { AuthContext } from "../../0.providers/AuthProvider";
import { Link } from "react-router-dom";

const NavbarExp = () => {
  const [expanded, setExpanded] = useState(false);
  const [verticalExpanded, setVerticalExpanded] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch((error) => console.log(error));
  };

  const handleClick = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => setVerticalExpanded(true), 500);
    } else {
      setVerticalExpanded(false);
      setTimeout(() => setExpanded(false), 500);
    }
  };

  return (
    <div className="h-[80px] relative flex justify-center items-center">
      {/* Clickable Circle */}
      <div
        className={`h-[80px] w-[80px] bg-cyan-500 rounded-full flex justify-center items-center z-10 cursor-pointer transition-transform duration-1000 ${
          expanded ? "rotate-[360deg]" : "rotate-0"
        }`}
        onClick={handleClick}
      >
        <p className="text-white text-xl font-bold">Click</p>
      </div>

      {/* Expanding Bar (Navigation Menu) */}
      <div
        className="bg-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 flex justify-between items-center overflow-hidden px-6"
        style={{
          width: expanded ? "100%" : "0%", // Expands horizontally
          height: verticalExpanded ? "80%" : "1px", // Expands vertically after delay
        }}
      >
        {expanded && verticalExpanded && (
          <div className="w-full flex flex-wrap justify-between items-center">
            {/* Left side links */}
            <ul className="flex space-x-6 text-white font-bold h-full justify-center flex-1">
              <li className="hover:underline">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:underline">
                <Link to="/tests">Tests</Link>
              </li>
              <li className="hover:underline">
                <Link to="/shortQuestions">Short Questions</Link>
              </li>
            </ul>

            {/* Center Section for User Login/Logout */}
            <div className="flex justify-between items-center text-white text-xl flex-1">
              <div className="w-1/3 text-center">
                {user ? <p>{user.displayName}</p> : <p>No User</p>}
              </div>
              <div className="w-1/3 text-center">
                {user ? (
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 rounded-md hover:underline hover:text-red-400 transition-all"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-all"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Right side links */}
            <ul className="flex space-x-6 text-white font-bold h-full justify-center flex-1">
              <li className="hover:underline">
                <Link to="/written">Written</Link>
              </li>
              <li className="hover:underline">
                <Link to="/videos">Videos</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Responsive Menu (Standard Horizontal Menu) */}
      <div className="sm:hidden absolute top-0 left-0 right-0 bottom-0 bg-cyan-400 flex justify-between items-center z-20 px-4 py-2">
        {expanded && verticalExpanded && (
          <div className="w-full flex justify-between items-center">
            {/* Left side links */}
            <ul className="flex space-x-6 text-white font-bold">
              <li className="hover:underline">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:underline">
                <Link to="/tests">Tests</Link>
              </li>
              <li className="hover:underline">
                <Link to="/shortQuestions">Short Questions</Link>
              </li>
            </ul>

            {/* Center Section for User Login/Logout */}
            <div className="text-center text-white text-xl">
              {user ? <p>{user.displayName}</p> : <p>No User</p>}
            </div>

            {/* Right side links */}
            <ul className="flex space-x-6 text-white font-bold">
              <li className="hover:underline">
                <Link to="/written">Written</Link>
              </li>
              <li className="hover:underline">
                <Link to="/videos">Videos</Link>
              </li>
            </ul>

            {/* Login/Logout Button */}
            <div className="text-center">
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-all"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition-all"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarExp;
