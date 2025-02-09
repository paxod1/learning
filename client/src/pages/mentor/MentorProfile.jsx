import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

export const MentorProfile = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/mentor/profile",
            });
            setUser(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(user);
    
    const handleLogout = async () => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/mentor/log-out",
            });
            dispatch(clearUser());
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div>
            <h1>{user?.name} </h1>
            <h1>{user?.email} </h1>
            <img src={user?.profilePic} alt="" />

            <button className="btn btn-outline">Edit </button>
            <br />
            <button onClick={handleLogout} className="btn btn-secondary"> Log-out </button>
            <Link className="link link-hover" to={'/mentor/create-Assignment'}>Create Assignments</Link>
        </div>
    );
};