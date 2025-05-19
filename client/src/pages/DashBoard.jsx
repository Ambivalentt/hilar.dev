import { Folder, Users, Settings, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Tasks from "../components/dashboard/Task.jsx";
import Projects from "../components/dashboard/Projects.jsx";
import Comments from "../components/dashboard/Comments.jsx";
import Activitylog from "../components/dashboard/Activitylog.jsx";
import Footer from "../components/Footer.jsx";


const Project = [
  {
    id: 1,
    name: "Project Alpha",
    description: "Build alpha version of the app",
    members: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Project Beta",
    description: "Beta testing and feedback",
    members: 3,
    status: "Paused",
  },
];



const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
     if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      console.log(isMenuOpen);
    }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Función para manejar clic en opciones del menú
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };
useEffect(() => {
  console.log("Estado isMenuOpen cambió a:", isMenuOpen);
}, [isMenuOpen]);
  return (
    <section className="min-h-screen flex flex-col bg-slate-900">
      <main className="bg-gray-900 min-h-max flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside ref={menuRef} className="lg:w-64  bg-gray-900 lg:border-r lg:border-white flex flex-col relative">
          {/* Mobile Header with Toggle */}
          <div className="flex justify-between items-center lg:hidden p-5 border-b border-white">
            <div className="text-white font-bold text-2xl">ProjectZone</div>
            <button
              className="text-white"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Desktop Header */}
          <div   className="hidden lg:block text-white py-5 px-10 font-bold text-3xl border-b border-white">
            ProjectZone
          </div>

          {/* Accordion Menu (Mobile) */}
          <div
           
            className={`absolute top-12  right-5 mt-2 w-52 bg-gray-800 rounded-md shadow-lg overflow-hidden transition-all duration-300 z-10 ${
              isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            } lg:hidden`}
          >
            <nav className="flex flex-col text-base font-medium py-2">
              <a
                href="#"
                onClick={handleMenuClick}
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition"
              >
                <Folder size={20} />
                My Projects
              </a>
              <a
                href="#"
                onClick={handleMenuClick}
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition"
              >
                <Users size={20} />
                My User
              </a>
              <a
                href="#"
                onClick={handleMenuClick}
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-700 transition"
              >
                <Settings size={20} />
                Configuración
              </a>
            </nav>
          </div>

          {/* Sidebar Menu (Desktop) */}
          <nav className="hidden lg:flex lg:flex-col mt-6 space-y-1 text-xl font-semibold">
            <a
              href="#"
              className="flex items-center gap-3 ps-10 h-12 text-white hover:bg-slate-800 rounded-md transition"
            >
              <Folder size={20} />
              My Projects
            </a>
            <a
              href="#"
              className="flex items-center gap-3 ps-10 h-12 text-white hover:bg-slate-800 rounded-md transition"
            >
              <Users size={20} />
              My User
            </a>
            <a
              href="#"
              className="flex items-center gap-3 ps-10 h-12 text-white hover:bg-slate-800 rounded-md transition"
            >
              <Settings size={20} />
              Configuración
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 m-10">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">
              Overview of your projects, tasks, comments, and activity logs.
            </p>
          </header>

          {/* Projects Section */}
          <Projects project={Project} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-white p-6">
        <Footer />
      </footer>
    </section>
  );
};

export default Dashboard;