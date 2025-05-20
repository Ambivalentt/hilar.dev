import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Folder, CheckCircle, MessageSquareText, Activity, LogOut, } from "lucide-react";



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
                    <Link to={'/dashboard'}>
                        <button
                            className="bg-indigo-600 font-semibold hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
                            type="button"
                        >
                            My Dashboard
                        </button>
                    </Link>

                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={image_url}
                            alt="User Avatar"
                            onClick={() => setIsOpen(prev => !prev)}
                            className="border-2 border-indigo-500 w-14 h-14 rounded-full cursor-pointer"
                        />

                        {/* Acordeón / Dropdown */}
                        <div className={`absolute right-0 mt-2 w-70 bg-slate-800 rounded-lg shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? "min-h-60 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="flex items-center gap-3 p-4 border-b-2 border-gray-500">
                                <img className="border-2 border-indigo-500 w-12 h-12 rounded-full" src={image_url} alt="" />
                                <h2 className="text-lg font-semibold text-white text-center py-2">
                                    {fullname}
                                </h2>
                            </div>
                            <ul className="flex flex-col text-white py-4 divide-gray-200 font-semibold ">
                                <li className="w-full flex gap-x-3 px-6 py-3 cursor-pointer hover:bg-gray-100/20 text-left">
                                     <Folder />
                                    <button className="">
                                        My Projects
                                    </button>
                                </li>
                                <li className="w-full flex gap-x-3 px-6 py-3 cursor-pointer hover:bg-gray-100/20 text-left">
                                    <User />
                                    <button className="">
                                        My profile
                                    </button>
                                </li>
                                <li className="w-full flex gap-x-3 px-6 py-3 cursor-pointer hover:bg-gray-100/20 text-left">
                                    <LogOut />
                                    <button onClick={() => logOut()} className="">
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
