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
import { FaSearch } from 'react-icons/fa';

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
    <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: 80 }}>
      {/* Search bar container */}
      <div style={{ position: 'sticky', top: 0,  zIndex: 10, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1000px' }}>
         
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            style={{
              padding: '6px 40px',
              width: '80%',
              border: 'none',
              borderRadius: '20px',
              backgroundColor: 'white',
              fontSize: '16px',
              color: '#e5e7eb',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              position: 'absolute',
              right: '150px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <FaSearch color="#9ca3af" />
          </button>
        </div>
      </div>

      {/* Results container with absolute position */}
      {results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#27272a',
            border: '1px solid #4b5563',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 9,
            maxHeight: '300px',
            overflowY: 'auto',
            marginTop: '5px',
            borderRadius: '4px',
          }}
        >
          {results.map((course) => (
            <div
              key={course._id}
              style={{
                padding: '10px',
                borderBottom: '1px solid #4b5563',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h2
                onClick={() => handleCourseClick(course._id)}
                style={{
                  cursor: 'pointer',
                  color: '#4b5563',
                  textDecoration: 'underline',
                  marginRight: '10px',
                }}
              >
                {course.title}
              </h2>
              <button
                onClick={() => handleCourseClick(course._id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
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

