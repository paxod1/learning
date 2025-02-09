import React, { useState, useEffect } from "react";

import { axiosInstance } from "../../config/axiosInstance";

// Custom Hook for Fetching Assignments
 const useAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axiosInstance.get("/assignment/all");
                console.log("API Response:", response.data);

                // Ensure response data is an array to prevent `.map()` errors
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

// Main Component: View Assignments
export const ViewAssignment = () => {
    const { assignments, loading, error } = useAssignments(); // Use the custom hook

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
                        <li key={assignment._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                            <h3>{assignment.title}</h3>
                            <p>{assignment.description}</p>
                            <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>

                            <h4>Submissions:</h4>
                            {assignment.submissions && assignment.submissions.length > 0 ? (
                                <ul>
                                    {assignment.submissions.map((submission) => (
                                        <li key={submission._id} style={{ marginBottom: "5px", padding: "5px", border: "1px solid #ddd" }}>
                                            <p><strong>Student ID:</strong> {submission.studentId}</p>
                                            <p><strong>Content:</strong> {submission.content}</p>
                                            <p><strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
                                            {submission.feedback && <p><strong>Feedback:</strong> {submission.feedback}</p>}
                                            {submission.score !== undefined && <p><strong>Score:</strong> {submission.score}</p>}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No submissions yet</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

