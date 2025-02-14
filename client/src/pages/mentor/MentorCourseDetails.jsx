import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

// export const MentorCourseDetails = () => {
  

//     const { id } = useParams();
//     const [courseDetails,isLoading]=useFetch(`/course/courseDetails/${id}`)

//     const handleAddToCart = async()=>{
//       try {
//         const response = await axiosInstance({
//           method:"POST",
//           url:"/cart/add-to-cart",
//           data: {courseId:id}
//         })
//         toast.success('product added to cart')
//       } catch (error) {
//         console.log(error); 
//         toast.error(error?.response?.data?.message ||  'error adding product to cart') 
//       }
//     }


//     return (
//         <div className="flex ">
//             <div className="w-4/12">
//               <img src={courseDetails?.image} alt="course-image" />
//             </div>
//             <div className="w-10/12">
//               <h2 className="text-3xl">{courseDetails?.title}</h2>
//               <p>{courseDetails?.description}</p>
//               <button className="btn btn-success" onClick={handleAddToCart}>Add to cart</button>
//             </div>
//         </div>
//     );
// };



export const MentorCourseDetails = () => {
  const { id } = useParams();

  // Fetch course details
  const [courseDetails, isLoading] = useFetch(`/course/courseDetails/${id}`);

  // Fetch lectures
  const [lectures, setLectures] = useState([]);
  const [loadingLectures, setLoadingLectures] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axiosInstance.post("/lectures/getLectures", { courseId: id });
        setLectures(response.data.lectures);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoadingLectures(false);
      }
    };

    fetchLectures();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post("/cart/add-to-cart", { courseId: id });
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error adding product to cart");
    }
  };

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


      <button
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      {/* Lesson Dropdowns - Manually Designed */}
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
