import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const AdminCourseDetails = () => {
  const { id } = useParams();

  // Fetch course details
  const [courseDetails, isLoading] = useFetch(`/course/courseDetails/${id}`);

  // Fetch lectures
  const [lectures, setLectures] = useState([]);
  const [loadingLectures, setLoadingLectures] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axiosInstance.post("/lectures/getLectures", {
          courseId: id,
        });
        setLectures(response.data.lectures);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoadingLectures(false);
      }
    };

    fetchLectures();
  }, [id]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-900 text-white p-6">
      {/* Course Details */}
      <div className="flex flex-col md:flex-row w-full gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={courseDetails?.image}
            alt="Course Thumbnail"
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-3xl font-bold">{courseDetails?.title}</h2>
          <p className="mt-2 text-gray-300">{courseDetails?.description}</p>
        </div>
      </div>

      {/* Lectures Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Lectures</h3>
        {loadingLectures ? (
          <p className="text-gray-400">Loading lectures...</p>
        ) : lectures.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {lectures.map((lecture) => (
              <li key={lecture._id} className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-lg">{lecture.title}</h4>
                <p className="text-gray-300 text-sm mt-1 break-words">
                  {lecture.description}
                </p>
                {lecture.videoUrl && (
                  <div className="mt-2">
                    <video controls className="w-full rounded-lg">
                      <source src={lecture.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No lectures available for this course.</p>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6 flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
          Add to Cart
        </button>
      </div>

      {/* Lesson Dropdowns */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Lessons</h3>

        {/* Lesson 1 */}
        <details className="mt-2 bg-gray-800 p-3 rounded-lg">
          <summary className="cursor-pointer font-medium">
            Lesson 1: Introduction
          </summary>
          <ul className="mt-2 space-y-1 text-gray-300 pl-4">
            <li className="text-sm flex items-center">
              <input type="checkbox" className="mr-2" />
              Topic 1: Overview
            </li>
            <li className="text-sm flex items-center">
              <input type="checkbox" className="mr-2" />
              Topic 2: Basics
            </li>
          </ul>
        </details>

        {/* Lesson 2 */}
        <details className="mt-2 bg-gray-800 p-3 rounded-lg">
          <summary className="cursor-pointer font-medium">
            Lesson 2: Advanced Concepts
          </summary>
          <ul className="mt-2 space-y-1 text-gray-300 pl-4">
            <li className="text-sm flex items-center">
              <input type="checkbox" className="mr-2" />
              Topic 1: Deep Dive
            </li>
            <li className="text-sm flex items-center">
              <input type="checkbox" className="mr-2" />
              Topic 2: Practical Examples
            </li>
          </ul>
        </details>

        {/* Lesson 3 */}
        <details className="mt-2 bg-gray-800 p-3 rounded-lg">
          <summary className="cursor-pointer font-medium">
            Lesson 3: Final Steps
          </summary>
          <ul className="mt-2 space-y-1 text-gray-300 pl-4">
            <li className="text-sm flex items-center">
              <input type="checkbox" className="mr-2" />
              Topic 1: Summary
            </li>
            <li className="text-sm flex items-center">
              <input type="checkbox" className="mr-2" />
              Topic 2: Next Steps
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};
