
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const RightSectionTxt = ({user}) => {
    return (
        <section className="xl:max-w-[32rem] max-w-[20rem] lg:max-w-[20rem] sm:max-w-md ">
            <motion.h1
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl sm:text-5xl font-extrabold mb-6 "
            >
                Empower Your Workflow
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-gray-300 mb-10"
            >
                Build and manage your projects seamlessly: create tasks, assign roles,
                collaborate with team members, leave comments, and track every
                activity.
            </motion.p>

            <motion.button
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-indigo-700 hover:bg-indigo-600 cursor-pointer  px-10 py-3 rounded-xl font-semibold shadow-lg focus:outline-none"
                style={{ willChange: "transform, opacity" }}
            >
                {user ? <Link to='/dashboard'>Go to Dashboard</Link> : <Link to='/login'>Get Started</Link>}
            </motion.button>
        </section>
    )
}

export default RightSectionTxt;