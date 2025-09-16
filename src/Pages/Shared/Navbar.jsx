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
        <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded-lg">
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/tests"
          className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
        >
          Tests
        </Link>
      </li>
      <li>
        <Link
          to="/shortQuestions"
          className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
        >
          Short Questions
        </Link>
      </li>
      <li>
        <Link
          to="/written"
          className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
        >
          Written Test
        </Link>
      </li>
      <li>
        <Link
          to="/rplpage"
          className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
        >
          RPL Test
        </Link>
      </li>
      <li>
        <Link
          to="/videos"
          className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
        >
          Videos
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        {user?.displayName === "Ahmed Nashif" ? (
          <Link to="https://drive.google.com/drive/u/1/folders/1-F7xAcQoW9DdFhiQiF4CLEyoTqJVkHKL" className="text-xl font-bold" target="blank">
            Special Link
          </Link>
        ) : (
          <Link to="/" className="text-xl font-bold">
            TVET
          </Link>
        )}

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex items-center space-x-4">{navOptions}</ul>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-lg font-semibold hidden sm:block">
                {user.displayName || "User"}
              </span>
              <button
                onClick={handleLogOut}
                className="btn bg-red-500 text-white shadow-md rounded-lg px-4 py-2 hover:bg-red-600 border-none"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn bg-blue-500 text-white shadow-md rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              Login
            </Link>
          )}

          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-[1] mt-3 p-2 shadow bg-gray-700 rounded-box w-52"
              >
                {navOptions}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
