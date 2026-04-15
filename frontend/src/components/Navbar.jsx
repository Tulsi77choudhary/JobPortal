import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import AuthModal from "./Auth/AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const navItems = [
  { name: "Home", href: "#" },
  { name: "Application", href: "#" },
  { name: "Massage", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);
  const user = auth.user;
  const isLoggedIn = !!user;

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="fixed top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">

            {/* LOGO FIXED */}
            <div className="flex shrink-0 items-center">
              <span
                className="text-white font-bold text-2xl cursor-pointer"
                onClick={() => navigate("/")}
              >
                Job<span className="text-blue-500">Portal</span>
              </span>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm"
                >
                  {item.name}
                </a>
              ))}

              <div className="h-6 w-px bg-white/10 mx-2" />

              {/*CONDITIONAL RENDER */}
              {!isLoggedIn ? (
                <>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
                    Post a Job
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">

                  {/* Notification */}
                  <button className="text-gray-400 hover:text-white relative">
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    <BellIcon className="size-6" />
                  </button>

                  {/* Profile */}
                  <Menu as="div" className="relative">
                    <MenuButton>
                      <div className="size-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium uppercase shadow-sm">
                        {user?.name ? user.name.charAt(0) : "U"}
                      </div>
                    </MenuButton>

                    <MenuItems className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg p-1">

                      <MenuItem>
                        <button
                          onClick={() => navigate("/profile")}
                          className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                        >
                          Your Profile
                        </button>
                      </MenuItem>

                      <MenuItem>
                        <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                          Settings
                        </button>
                      </MenuItem>

                      <MenuItem>
                        <button
                          onClick={handleLogout} //  FIXED
                          className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              )}
            </div>

            {/* Mobile */}
            <div className="sm:hidden">
              <DisclosureButton>
                <Bars3Icon className="size-6 text-white" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        {/* Mobile Panel */}
        <DisclosurePanel className="sm:hidden bg-gray-900 p-4">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="block py-2 text-gray-300">
              {item.name}
            </a>
          ))}
        </DisclosurePanel>
      </Disclosure>

      {/* Modal */}
      <AuthModal
        open={isAuthModalOpen}
        handleClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}