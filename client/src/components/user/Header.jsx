import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import {SearchBar} from "../../pages/user/SearchBar";

export const Header = () => {

    const navigate =useNavigate()

    return (
        <div className="flex justify-between items-center w-full px-20  h-24 shadow-2xl  ">
            <Link to={"/"}>
                <div className="text-3xl font-bold"> ACUMEN</div>
            </Link>
            <div className="px-10 w-full"> <SearchBar /></div>
               
                <div className="flex items-center gap-20">
            <nav className="flex gap-16 items-center font-semibold">
                <Link to={""}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/course"}>Course</Link>
                

            </nav>

            <div className="flex items-center gap-10">
                <DarkMode/>
                <button onClick={()=>navigate('/signup')} className="btn btn-primary">Join us</button>
            </div>
            </div>
        </div>
    );
};
