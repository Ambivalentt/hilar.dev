import { Folder, Users, Settings, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const HomeDashboard = () => {

  return (
    <section className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950  via-black to-indigo-950">
      <main className=" min-h-max flex flex-col lg:flex-row flex-grow">
        <Sidebar /> 
        <section className="flex-1 m-10">
          <Outlet />
        </section>
      </main>

      {/* Footer */}
      <footer className=" border-t border-white p-6">
        <Footer />
      </footer>
    </section>
  );
};

export default HomeDashboard;