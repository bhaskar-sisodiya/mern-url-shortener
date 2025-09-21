import React from "react";
import { Link } from "@tanstack/react-router";

const Navbar = ({ isLoggedIn, userName, onLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-white via-gray-50 to-gray-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - App Name */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-800 tracking-tight hover:text-blue-600 transition-colors duration-200"
          >
            URL<span className="text-blue-600">Shortener</span>
          </Link>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* <span className="hidden sm:inline text-gray-600 text-sm">
                  Hi, <span className="font-medium">{userName}</span>
                </span> */}
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-lg shadow-md transition transform hover:scale-[1.02] duration-200"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
