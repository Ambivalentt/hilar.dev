import { Menu, Folder, User, Settings } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
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


  return (
    <aside ref={menuRef} className="lg:w-64  bg-gray-900 lg:border-r lg:border-white flex flex-col relative">
      {/* Mobile Header with Toggle */}
      <div className="flex justify-between items-center lg:hidden p-5 border-b border-white">
        <div className="text-white font-bold text-2xl">ProjectZone</div>
        <button className="text-white" onClick={() => { setIsMenuOpen((prev) => !prev) }}>
          <Menu size={28} />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block text-white py-5 px-10 font-bold text-3xl border-b border-white">
        ProjectZone
      </div>

      {/* Accordion Menu (Mobile) */}
      <div className={`absolute top-12  right-5 mt-2 w-52 bg-gray-800 rounded-md shadow-lg overflow-hidden transition-all duration-300 z-10 ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} lg:hidden`}>
        <nav className="flex flex-col text-base font-medium py-2">
          <Link to={'/dashboard/user-details'} onClick={handleMenuClick} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition">
            <User size={20} />
            My User
          </Link>
          <a href="#" onClick={handleMenuClick} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition">
            <Folder size={20} />
            My Projects
          </a>
          <a href="#" onClick={handleMenuClick} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition">
            <Settings size={20} />
            Configuración
          </a>
        </nav>
      </div>

      {/* Sidebar Menu (Desktop) */}
      <nav className="hidden lg:flex lg:flex-col mt-6 space-y-1 text-xl font-semibold">
        <Link to='/dashboard/user-details' className="flex items-center gap-3 ps-10 h-12 text-white hover:bg-slate-800 rounded-md transition">
          <User size={20} />
          My Profile
        </Link>
        <Link to="/dashboard" className="flex items-center gap-3 ps-10 h-12 text-white hover:bg-slate-800 rounded-md transition">
          <Folder size={20} />
          My Projects
        </Link>

        <Link to='/dashboard/user-settings' className="flex items-center gap-3 ps-10 h-12 text-white hover:bg-slate-800 rounded-md transition">
          <Settings size={20} />
          Profile Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
