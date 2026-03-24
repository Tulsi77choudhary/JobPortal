import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const footerLinks = {
  Resources: [
    { name: "Browse Jobs", href: "#" },
    { name: "Companies", href: "#" },
    { name: "Salaries", href: "#" },
    { name: "Career Advice", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
  Support: [
    { name: "Help Center", href: "#" },
    { name: "Post a Job", href: "#" },
    { name: "Sitemap", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <span className="text-white font-bold text-2xl tracking-tight">
              Job<span className="text-blue-500">Portal</span>
            </span>
            <p className="mt-4 text-gray-400 max-w-xs">
              Connecting the world's best talent with the most innovative companies. Your dream job is just one click away.
            </p>
            <div className="flex space-x-5 mt-6">
              <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><FaLinkedin size={20} /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><FaInstagram size={20} /></a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-blue-400 transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-auto">
            <h4 className="text-white font-medium mb-2">Subscribe to our newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                Join
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} JobPortal Inc. All rights reserved. Made with ❤️ for developers.
          </p>
        </div>
        
      </div>
    </footer>
  );
}