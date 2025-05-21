import { Menu, Folder, User, Settings } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = () => setIsMenuOpen(false);

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 transition ${
      isActive ? "bg-slate-700 text-white" : "text-white hover:bg-slate-700"
    }`;

  const navLinkStyleDesktop = ({ isActive }) =>
    `flex items-center gap-3 ps-10 h-12 rounded-md transition ${
      isActive ? "bg-slate-800 text-white" : "text-white hover:bg-slate-800"
    }`;

  return (
    <aside ref={menuRef} className="lg:w-64 bg-gray-900 lg:border-r lg:border-white flex flex-col relative">
      {/* Mobile Header with Toggle */}
      <div className="flex justify-between items-center lg:hidden p-5 border-b border-white">
        <div className="text-white font-bold text-2xl">
          <NavLink className="cursor-pointer" to="/">ProjectZone</NavLink>
        </div>
        <button className="text-white" onClick={() => setIsMenuOpen((prev) => !prev)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block text-white py-5 px-10 font-bold text-3xl border-b border-white">
        <NavLink className="cursor-pointer" to="/">ProjectZone</NavLink>
      </div>

      {/* Accordion Menu (Mobile) */}
      <div className={`absolute top-12 right-5 mt-2 w-52 bg-gray-800 rounded-md shadow-lg overflow-hidden transition-all duration-300 z-10 ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} lg:hidden`}>
        <nav className="flex flex-col text-base font-medium py-2">
          <NavLink to="/dashboard/user-details" onClick={handleMenuClick} className={navLinkStyle}>
            <User size={20} />
            My User
          </NavLink>
          {/* end para terminar la subrutas */}
          <NavLink to="/dashboard" end onClick={handleMenuClick} className={navLinkStyle}>
            <Folder size={20} />
            My Projects
          </NavLink>
          <NavLink to="/dashboard/user-settings" onClick={handleMenuClick} className={navLinkStyle}>
            <Settings size={20} />
            Configuración
          </NavLink>
        </nav>
      </div>

      {/* Sidebar Menu (Desktop) */}
      <nav className="hidden lg:flex lg:flex-col mt-6 space-y-1 text-xl font-semibold">
        <NavLink to="/dashboard/user-details" className={navLinkStyleDesktop}>
          <User size={20} />
          My Profile
        </NavLink>
        <NavLink to="/dashboard" end className={navLinkStyleDesktop}>
          <Folder size={20} />
          My Projects
        </NavLink>
        <NavLink to="/dashboard/user-settings" className={navLinkStyleDesktop}>
          <Settings size={20} />
          Profile Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
