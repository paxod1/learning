import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-between items-center w-full px-20 h-24 shadow-2xl bg-white">
      {/* Logo */}
      <Link to={"/"} className="text-3xl font-bold z-10">Acumen</Link>

      {/* Navigation Links */}
      <div className="flex gap-16 items-center font-semibold z-10">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/about" className="hover:text-blue-500">About</Link>
        <Link to="/course" className="hover:text-blue-500">Course</Link>
      </div>

      {/* Dark Mode Toggle & Button */}
      <div className="flex items-center gap-10 z-10">
        <DarkMode />
        <button onClick={() => navigate("/signup")} className="btn btn-primary">
          Join us
        </button>
      </div>
    </div>
  );
};
