import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const AdminCourseDetails = () => {
  const { id } = useParams();
  const [courseDetails] = useFetch(`/course/courseDetails/${id}`);
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
        toast.error("Failed to load lectures.");
      } finally {
        setLoadingLectures(false);
      }
    };

    fetchLectures();
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-900 text-white p-6">
      {/* Left Side - Thumbnail inside Video Frame */}
      <div className="w-full md:w-1/2 p-4">
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={courseDetails?.image}
            alt="Course Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side - Course Details */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold">{courseDetails?.title}</h2>
        <p className="mt-2 text-gray-300 break-words mr-4">
          {courseDetails?.description}
        </p>

        {/* Lectures Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Lectures</h3>
          {loadingLectures ? (
            <p className="text-gray-400 mt-2">Loading lectures...</p>
          ) : lectures.length === 0 ? (
            <p className="text-gray-400 mt-2">No lectures available.</p>
          ) : (
            lectures.map((lecture, index) => (
              <details
                key={lecture._id}
                className="mt-2 bg-gray-800 p-3 rounded-lg"
              >
                <summary className="cursor-pointer font-medium">
                  {index + 1}. {lecture.title}
                </summary>
                <ul className="mt-2 space-y-1 text-gray-300 pl-4">
                  <li className="text-sm">{lecture.description}</li>
                  {lecture.videoUrl && (
                    <li className="mt-2">
                      <a
                        href={lecture.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Watch Video
                      </a>
                    </li>
                  )}
                </ul>
              </details>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
