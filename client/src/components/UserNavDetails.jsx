import { useState, useRef, useEffect } from "react";

const UserNavDetails = ({ user, logOut }) => {
  const { image_url } = user;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="fixed top-0 px-6 md:px-0 left-0 w-full z-50 bg-slate-900 border-b border-slate-700"
      role="navigation"
      aria-label="Project dashboard navigation"
    >
      <div className="mx-auto w-full flex flex-col md:flex-row items-center justify-around py-3 gap-4 md:gap-0 relative">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white-400 text-center md:text-left">
          Project Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-6 w-full md:w-auto text-center md:text-left relative" ref={dropdownRef}>
          <button
            className="bg-indigo-600 font-semibold hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
            type="button"
          >
            My Dashboard
          </button>

          {/* Avatar */}
          <div className="relative">
            <img
              src={image_url}
              alt="User Avatar"
              onClick={toggleDropdown}
              className="border-2 border-indigo-500 w-14 h-14 rounded-full cursor-pointer"
            />

            {/* Acordeón / Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border-1 border-white transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="flex flex-col text-white divide-y  divide-gray-200 text-left font-semibold ">
                <li>
                  <button className="w-full px-4 py-3 cursor-pointer hover:bg-gray-100/20 text-right">
                    My Projects
                  </button>
                </li>
                <li>
                  <button className="w-full px-4 py-3 cursor-pointer hover:bg-gray-100/20 text-right">
                   My profile
                  </button>
                </li>
                <li>
                  <button onClick={() => logOut()} className="w-full px-4 py-3 cursor-pointer text-right hover:bg-gray-100/20  text-red-500">
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavDetails;
