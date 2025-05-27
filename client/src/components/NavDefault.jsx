import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const NavDefault = () => {

    return (
        <motion.div
            className="flex gap-x-4 items-center justify-center "
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Link to={'/login'}
                className="bg-indigo-700  hover:bg-indigo-600 border-indigo-700 border-2 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
                Login
            </Link>
            <Link to='/register'
                className="bg-transparent border-2 cursor-pointer border-indigo-700 hover:bg-indigo-700 hover:text-white text-indigo-400 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
                Register
            </Link>
        </motion.div>
    )

}

export default NavDefault;