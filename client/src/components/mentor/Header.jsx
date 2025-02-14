import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { SearchBar } from "../../pages/user/SearchBar"; // If you have a SearchBar

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-between items-center w-full px-10 h-24 shadow-2xl bg-white">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold z-20">Acumen</Link>

      {/* Navigation & Search Bar */}
      <div className="flex items-center gap-10 z-10">
        <nav className="flex gap-8 font-semibold relative z-20">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/course" className="hover:text-blue-500">Course</Link>
        </nav>

        {/* Search Bar - Ensuring it doesn’t overlap */}
        <div className="relative z-10">
          <SearchBar className="w-64" />
        </div>
      </div>

      {/* Dark Mode & Button */}
      <div className="flex items-center gap-6 z-10">
        <DarkMode />
        <button onClick={() => navigate("/signup")} className="btn btn-primary">
          Join us
        </button>
      </div>
    </div>
  );
};
