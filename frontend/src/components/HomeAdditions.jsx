import { BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function HomeAdditions() {
  const categories = [
    { name: "Development", count: "1.2k+", icon: "💻" },
    { name: "Design", count: "800+", icon: "🎨" },
    { name: "Marketing", count: "500+", icon: "📈" },
    { name: "Customer Support", count: "300+", icon: "🎧" },
  ];

  return (
    <div className="bg-gray-100">
      
      {/* 1. Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">12k+</h3>
            <p className="text-gray-500 text-sm">Active Jobs</p>
          </div>
          <div className="text-center border-l border-gray-100">
            <h3 className="text-3xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-500 text-sm">Companies</p>
          </div>
          <div className="text-center border-l border-gray-100">
            <h3 className="text-3xl font-bold text-blue-600">20k+</h3>
            <p className="text-gray-500 text-sm">Candidates</p>
          </div>
          <div className="text-center border-l border-gray-100">
            <h3 className="text-3xl font-bold text-blue-600">8k+</h3>
            <p className="text-gray-500 text-sm">Success Stories</p>
          </div>
        </div>
      </section>

      {/* 2. Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">{cat.name}</h4>
              <p className="text-gray-500 text-sm">{cat.count} open positions</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Call to Action (Post a Job) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="relative overflow-hidden bg-blue-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl shadow-blue-200">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Are you hiring talent?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Post your job in minutes and reach thousands of qualified candidates today.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Post a Job for Free
            </button>
          </div>
          {/* Abstract Background Decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
        </div>
      </section>

    </div>
  );
}