import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

export const CreateAssignment = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/assignment/create", {
                title,
                description,
                dueDate
            }, { withCredentials: true });

            alert(response.data.message);
        } catch (error) {
            console.error("Error creating assignment:", error);
        }
    };

    return (
        <div>
            <h2>Create Assignment</h2>
            <form onSubmit={handleCreateAssignment}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                <button type="submit">Create</button>
            </form>
            <Link className="link link-hover" to={'/mentor/view-Assignment'}>View Assignments</Link>
        </div>
    );
};

 
