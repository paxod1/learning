import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { clearMentor } from "../../redux/features/mentorSlice";
import { useDispatch } from "react-redux";

export const MentorProfile = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchMentorProfile = async () => {
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
            dispatch(clearMentor());
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    

    useEffect(() => {
        fetchMentorProfile();
    }, []);

    return (
        <div>
            <h1>{user?.name} </h1>
            <h1>{user?.email} </h1>
            <img src={user?.profilePic} alt="" />

            <button className="btn btn-outline">Edit </button>
            <br />
            <button onClick={handleLogout} className="btn btn-secondary"> Log-out </button>
        </div>
    );
};
