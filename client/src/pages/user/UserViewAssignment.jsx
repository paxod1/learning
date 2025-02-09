import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

// 🔹 Custom Hook for Fetching Assignments
const useAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axiosInstance.get("/assignment/all");
                console.log("API Response:", response.data);

                if (Array.isArray(response.data)) {
                    setAssignments(response.data);
                } else {
                    setAssignments([]);
                }
            } catch (error) {
                console.error("Error fetching assignments:", error);
                setError("Failed to load assignments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    return { assignments, loading, error };
};

// 🔹 Main Component: View Assignments
export const UserViewAssignment = () => {
    const { assignments, loading, error } = useAssignments();
    const navigate = useNavigate();

    if (loading) return <p>Loading assignments...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Assignments</h2>
            {assignments.length === 0 ? (
                <p>No assignments available</p>
            ) : (
                <ul>
                    {assignments.map((assignment) => (
                        <li key={assignment._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
                            <h3>{assignment.title}</h3>
                            <p>{assignment.description}</p>
                            <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>

                            {/* Submit Assignment Button */}
                            <button
                                onClick={() => navigate(`/submit-assignment/${assignment._id}`)}
                                style={{
                                    padding: "5px 10px",
                                    background: "blue",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Submit Assignment
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
