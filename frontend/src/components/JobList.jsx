import { useState } from "react";
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon } from "@heroicons/react/24/outline";

const dummyJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechFlow Interactive",
    location: "Remote / New York",
    salary: "$120k - $150k",
    type: "Full-time",
    posted: "2 hours ago",
    isNew: true,
  },
  {
    id: 2,
    title: "UX/UI Product Designer",
    company: "Creative Pulse",
    location: "London, UK",
    salary: "$80k - $100k",
    type: "Contract",
    posted: "5 hours ago",
    isNew: true,
  },
  {
    id: 3,
    title: "Backend Engineer (Node.js)",
    company: "DataScale Systems",
    location: "San Francisco, CA",
    salary: "$140k - $180k",
    type: "Full-time",
    posted: "1 day ago",
    isNew: false,
  },
];

export default function JobList() {
  const [jobs] = useState(dummyJobs);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Latest Opportunities</h2>
        <span className="text-sm text-gray-500">{jobs.length} jobs found</span>
      </div>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="group bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  {job.isNew && (
                    <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 font-medium">{job.company}</p>

                {/* Job Meta Tags */}
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="size-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <CurrencyDollarIcon className="size-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="size-4" />
                    {job.type}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-gray-400">Posted {job.posted}</p>
                </div>
                <button className="w-full md:w-auto bg-gray-100 text-gray-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  Apply Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}