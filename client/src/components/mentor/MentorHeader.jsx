import React from "react";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { SearchBarMentor } from "../../pages/mentor/SearchBarMentor";

export const MentorHeader = () => {
    return (
        <div className="flex justify-between items-center w-full px-20 h-24 shadow-2xl relative bg-white">
            {/* Mentor Title Link - Positioned to prevent overlap */}
            <Link to={"/mentor/home"} className="absolute left-10 top-1/2 transform -translate-y-1/2 z-10">
                <div className="text-3xl font-bold">Mentor</div>
            </Link>

            {/* Search Bar - Properly placed to avoid overlapping links */}
            <div className="w-1/3 px-10">
                <SearchBarMentor />
            </div>

            {/* Navigation Links - No Overlapping */}
            <nav className="flex gap-10 items-center font-semibold z-10">
                <Link to="/mentor/home" className="hover:text-blue-500">Home</Link>
                <Link to="/mentor/about" className="hover:text-blue-500">About</Link>
                <Link to="/mentor/course" className="hover:text-blue-500">Course</Link>
                <Link to="/mentor/students" className="hover:text-blue-500">Students</Link>
                <Link to="/mentor/sessions" className="hover:text-blue-500">Sessions</Link>
            </nav>

            {/* Dark Mode & Profile */}
            <div className="flex gap-6 px-10 items-center z-10">
                <DarkMode />
                <Link to="/mentor/profile">
                    <CircleUser className="w-6 h-6" />
                </Link>
            </div>
        </div>
    );
};
