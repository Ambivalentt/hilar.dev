import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Folder, CheckCircle, MessageSquareText, Activity, LogOut, } from "lucide-react";
import { motion } from "framer-motion";


const UserNavDetails = ({ user, logOut }) => {
    const { first_name, last_name, image_url } = user;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const fullname = `${first_name} ${last_name}`;

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
        <nav className="fixed top-0 px-6 md:px-0 left-0 w-full z-50"
            role="navigation"
            aria-label="Project dashboard navigation">
            <div className="w-full flex flex-col  md:flex-row justify-end d py-3 gap-4 md:gap-0 relative">
                <div className="flex flex-col-reverse mt-5 lg:mt-5 gap-y-4 sm:flex-row me-12 items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-6 w-full md:w-auto text-center md:text-left relative" ref={dropdownRef}>
                    <Link to={'/dashboard'}>
                        <button
                            className="bg-indigo-800 cursor-pointer font-semibold hover:bg-indigo-900 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
                            type="button"
                        >
                            My Dashboard
                        </button>
                    </Link>

                    {/* Avatar */}
                    <section className="relative">
                        <img
                            src={image_url}
                            alt="User Avatar"
                            onClick={() => setIsOpen(prev => !prev)}
                            className="border-2 border-indigo-500 w-14 h-14 rounded-full cursor-pointer"
                        />

                        {/* Acordeón / Dropdown */}
                        <section className={`absolute -right-30 md:right-0 mt-2 w-70 bg-slate-900 rounded-lg shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? "min-h-60 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="flex items-center gap-3 p-4 border-b-2 border-gray-500">
                                <img className="border-2 border-indigo-500 w-12 h-12 rounded-full" src={image_url} alt="" />
                                <h2 className="text-lg font-semibold text-white text-center py-2">
                                    {fullname}
                                </h2>
                            </div>
                            <ul className="flex flex-col text-white py-4 divide-gray-200 font-semibold ">
                                <li className="w-full cursor-pointer hover:bg-gray-100/20 text-left">
                                    <Link className="flex gap-x-3 px-6 py-3" to='/dashboard'>
                                        <Folder />
                                        My Projects
                                    </Link>
                                </li>
                                <li className="w-full  cursor-pointer hover:bg-gray-100/20 text-left">
                                    <Link className="flex gap-x-3 px-6 py-3" to='/dashboard/user-details'>
                                        <User />
                                        My Profile
                                    </Link>
                                </li>
                                <li className="w-full  cursor-pointer hover:bg-gray-100/20 text-left">
                                    <button onClick={() => logOut()} className=" w-full cursor-pointer flex gap-x-3 px-6 py-3">
                                        <LogOut />
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </section>
                    </section>
                </div>
            </div>
        </nav>
    );
};

export default UserNavDetails;
