import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavDefault from "../components/NavDefault";
import BackgroundTextSide from "../components/LandingPage/SideSection.jsx";
import ImageShowcase from '../components/LandingPage/ImageShowCase.jsx';
import RightSectionTxt from '../components/LandingPage/RighrSectionTxt.jsx';
import UserNavDetails from "../components/UserNavDetails.jsx";
import { useStateContext } from '../context/authContext.jsx';
import ActiveMembers from "../components/ActiveMembers.jsx";
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
    <main className="relative min-h-screen h-full  bg-gradient-to-br from-indigo-950  via-black to-indigo-950  text-white ">
      <nav className="w-full flex justify-end absolute md:pe-10 md:pt-10 pt-10">
        {
          user === null ? (
            <NavDefault />
          ) : (
            <UserNavDetails user={user} logOut={logOut} />
          )
        }
      </nav>
      <main className="flex min-h-screen lg:pb-30 gap-y-4 md:gap-y-20 justify-center items-center px-5 flex-col md:flex-row">
        <BackgroundTextSide />
        <ImageShowcase />
        <main className="relative z-10 max-w-lg mt-10 md:mt-0 md:ml-12 text-center md:text-left">
          <RightSectionTxt user={user} />
        </main>
      </main>
      <footer className="lg:absolute bottom-4 left-10 p-5">
        <ActiveMembers  />
      </footer>
    </main>
  );
}
