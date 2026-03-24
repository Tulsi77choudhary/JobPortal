import { useEffect, useState } from "react";
import API from "../config/api";

function Home() {
  const [blogs, setBlogs] = useState([]);

  return (
    <div className="p-4 md:p-8 bg-gray-300 min-h-screen flex flex-col items-center justify-center">
      
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Find Your <span className="text-blue-600">Dream Job</span>
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Thousands of opportunities are waiting for you.
        </p>
      </div>

      {/* Job Search Div */}
      <div className="w-full max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search job title..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="text"
            placeholder="Location..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg shadow-blue-200">
            Search
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;