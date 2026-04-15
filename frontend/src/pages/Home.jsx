import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchJobs } from "../State/Job/Action";
import JobList from "../components/JobList";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleSearch = () => {
    setHasSearched(true);
    dispatch(searchJobs(title, location));
  }

  return (
    <>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Search job title..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg shadow-blue-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- RESULTS SECTION --- */}
      <div className="w-full">
        {/* 1. Loading State */}
        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* 2. Success: Render JobList */}
        {!loading && hasSearched && jobs && jobs.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <JobList jobs={jobs} />
          </div>
        )}

        {/* 3. Empty State: No Jobs Found */}
        {!loading && hasSearched && jobs && jobs.length === 0 && (
          <div className="text-center mt-12 p-8 bg-white max-w-xl mx-auto rounded-2xl shadow-sm">
            <p className="text-gray-500 text-xl font-medium">Koi jobs nahi mili 🔍</p>
            <p className="text-gray-400">Please try different keywords or location.</p>
          </div>
        )}

        {/* 4. Error State */}
        {error && (
          <div className="text-center mt-10 text-red-500 font-semibold">
            Error: {error}
          </div>
        )}
      </div>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 0, title: "Live Jobs", count: "10,000+" },
            { icon: 1, title: "Companies", count: "500+" },
            { icon: 2, title: "New Jobs/Day", count: "200+" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.count}</h3>
                <p className="text-gray-500">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <div>
        {/* Featured Jobs Section (Placeholder) */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
              <p className="text-gray-500">Hand-picked opportunities for you</p>
            </div>
            <button className="text-blue-600 font-medium hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Job Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                  G
                </div>
                <div>
                  <h4 className="font-bold text-lg">Full Stack Developer</h4>
                  <p className="text-sm text-gray-500">Google Inc. • Mumbai, IN</p>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Full Time</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">$80k - $120k</span>
              </div>
              <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}

export default Home;