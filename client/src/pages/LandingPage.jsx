import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavDefault from "../components/NavDefault";
import BackgroundTextSide from "../components/LandingPage/SideSection.jsx";
import ImageShowcase from '../components/LandingPage/ImageShowCase.jsx';
import RightSectionTxt from '../components/LandingPage/RighrSectionTxt.jsx';
import UserNavDetails from "../components/UserNavDetails.jsx";
import { useStateContext } from '../context/authContext.jsx';

export default function LandingPage() {

  const [loading, setLoading] = useState(true);
  const { user, logOut } = useStateContext();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="fixed inset-0 bg-gradient-to-br from-indigo-950  via-black to-indigo-950" />;
  }
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-950  via-black to-indigo-950  text-white flex flex-col md:flex-row items-center justify-center px-6 md:px-12 overflow-hidden">
      <nav className="fixed top-0 right-10 z-40 max-w-6xl ">
      {
        user === null ? (
          <NavDefault />
        ) : (
          <UserNavDetails user={user} logOut={logOut} />
        )
      }
      </nav>
      <BackgroundTextSide />
      <ImageShowcase />
      <main className="relative z-10 max-w-lg mt-10 md:mt-0 md:ml-12 text-center md:text-left">
        <RightSectionTxt user={user}/>
      </main>
    </main>
  );
}
