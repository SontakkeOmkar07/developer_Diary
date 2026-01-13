import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/signup");
  };
  const handleClick2 = () => {
    navigate("/login");
  };
  return (
    <header className="fixed top-0 w-full h-16 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 flex items-center shadow-xl backdrop-blur-md z-50 border-b border-slate-800">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-10">
        <div className="text-white text-2xl font-bold tracking-wide font-serif">
          DeveloperDiary<span className="text-emerald-400">.</span>
        </div>

        <nav>
          <ul className="flex gap-10 text-sm font-medium">
            <NavLink
              to="/"
              className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
            >
              Contact
            </NavLink>
          </ul>
        </nav>

        <section className="flex items-center gap-4">
          <button
            onClick={() => handleClick2()}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-emerald-400 border border-emerald-500/40 bg-slate-900 hover:bg-slate-800 hover:border-emerald-400 transition-all duration-200"
          >
            Login
          </button>

          <button
            onClick={() => handleClick1()}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-500 shadow-md hover:shadow-emerald-500/30 transition-all duration-200"
          >
            Sign Up
          </button>
        </section>
      </div>
    </header>
  );
};
