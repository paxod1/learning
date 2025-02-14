import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const CourseDetails = () => {
    const { id } = useParams();
    const [courseDetails, isLoading] = useFetch(`/course/courseDetails/${id}`);

    const handleAddToCart = async () => {
        try {
            await axiosInstance.post("/cart/add-to-cart", { courseId: id });
            toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Error adding product to cart");
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-900 text-white p-6">
            {/* Left Side - Video & Thumbnail */}
            <div className="w-full md:w-1/2 p-4">
                {/* Video Player */}
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                        src={courseDetails?.videoUrl}
                        controls
                        className="w-full h-full"
                    />
                </div>

                {/* Thumbnail */}
                <div className="mt-4">
                    <img
                        src={courseDetails?.image}
                        alt="course-thumbnail"
                        className="w-full h-40 object-cover rounded-lg"
                    />
                </div>
            </div>

            {/* Right Side - Course Details */}
            <div className="w-full md:w-1/2 p-4">
                <h2 className="text-3xl font-bold">{courseDetails?.title}</h2>
                <p className="mt-2 text-gray-300">{courseDetails?.description}</p>

                <button
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>

                {/* Lesson Dropdowns */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Lessons</h3>
                    {courseDetails?.lessons?.map((lesson, index) => (
                        <details key={index} className="mt-2 bg-gray-800 p-3 rounded-lg">
                            <summary className="cursor-pointer font-medium">
                                {lesson?.title}
                            </summary>
                            <ul className="mt-2 space-y-1 text-gray-300 pl-4">
                                {lesson?.topics?.map((topic, idx) => (
                                    <li key={idx} className="text-sm flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};
