import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-[#1F1F2E] text-white text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page not found</p>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg transition"
      >
        <ArrowLeft size={18} />
        Go back home
      </button>
    </section>
  );
};

export default NotFoundPage;
