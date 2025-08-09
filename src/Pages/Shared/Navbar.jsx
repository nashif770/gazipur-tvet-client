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
      <li className="py-2 px-4 hover:bg-gray-200 rounded-lg">
        <Link to="/">Home</Link>
      </li>
      <li className="py-2 px-4 hover:bg-gray-200 rounded-lg">
        <Link to="/tests">Tests</Link>
      </li>
      <li className="py-2 px-4 hover:bg-gray-200 rounded-lg">
        <Link to="/shortQuestions">Short Questions</Link>
      </li>
      <li className="py-2 px-4 hover:bg-gray-200 rounded-lg">
        <Link to="/written">Written Test</Link>
      </li>
      <li className="py-2 px-4 hover:bg-gray-200 rounded-lg">
        <Link to="/rplpage">RPL Test</Link>
      </li>
      <li className="py-2 px-4 hover:bg-gray-200 rounded-lg">
        <Link to="/videos">Videos</Link>
      </li>
    </>
  );

  return (
    <nav className="bg-gray-800 shadow-lg px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between py-3">
        {/* Mobile Dropdown */}
        <div className="lg:hidden">
          <div className="dropdown">
            <button tabIndex={0} className="btn bg-white p-2 rounded-lg">
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
              className="menu menu-sm dropdown-content mt-3 z-50 p-2 bg-white text-black shadow-lg rounded-lg w-52"
            >
              {navOptions}
            </ul>
          </div>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold bg-white shadow-md rounded-lg px-4 py-2"
        >
          TVET
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="flex space-x-4">{navOptions}</ul>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden sm:block text-lg font-semibold bg-white shadow-md rounded-lg px-4 py-2">
                {user.displayName || "User"}
              </span>
              <button
                onClick={handleLogOut}
                className="btn bg-white shadow-md rounded-lg px-4 py-2 hover:bg-red-600 hover:text-white border-none"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary px-4 py-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
