// components/SearchBar.js
// import React, { useState } from "react";
// import { axiosInstance } from "../../config/axiosInstance";

// export const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//         const response = await axiosInstance({
//             method:"GET",
//             url:"/search/search-course",
//             params: { query },
//           });
//       setResults(response.data);
//     } catch (error) {
//       console.error("Error fetching search results", error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search courses..."
//       />
//       <button onClick={handleSearch}>Search</button>

//       <div>
//         {results.map((course) => (
//           <div key={course._id}>
//             <h2>{course.title}</h2>
//             <p>{course.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/search/search-course",
        params: { query },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const handleCourseClick = (courseId) => {
    // Navigate to the course detail page with the courseId
    navigate(`/course-details/${courseId}`);
    setResults([]);
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "600px", margin: "auto" }}>
      {/* Search bar container */}
      <div style={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 10,
        padding: "10px",
        borderBottom: "1px solid #ccc"
      }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses..."
          style={{ padding: "5px", width: "200px" }}
        />
        <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "5px 10px" }}>
          Search
        </button>
      </div>

      {/* Results container with absolute position */}
      {results.length > 0 && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "white",
          border: "1px solid #ccc",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 9,
          maxHeight: "300px",
          overflowY: "auto",
          marginTop: "5px"
        }}>
          {results.map((course) => (
            <div key={course._id} style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
              <h2
                onClick={() => handleCourseClick(course._id)}
                style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
              >
                {course.title}
              </h2>
              <p>{course.description}</p>
              <button onClick={() => handleCourseClick(course._id)} style={{ padding: "5px 10px" }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

