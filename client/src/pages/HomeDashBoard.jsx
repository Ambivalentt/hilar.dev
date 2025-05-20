import { Folder, Users, Settings, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const HomeDashboard = () => {

  return (
    <section className="min-h-screen flex flex-col bg-slate-900">
      <main className="bg-gray-900 min-h-max flex flex-col lg:flex-row">
        <Sidebar /> 
        <section className="flex-1 m-10">
          <Outlet />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-white p-6">
        <Footer />
      </footer>
    </section>
  );
};

export default HomeDashboard;