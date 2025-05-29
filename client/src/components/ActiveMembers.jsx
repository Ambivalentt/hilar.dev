import React, { useState, useEffect } from "react";
import { getRecentUsers } from "../api/users.jsx";
import { motion } from "framer-motion";

const ActiveMembers = () => {
    const [latestMembers, setLatestMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getRecentUsers();
                setLatestMembers(response.users);
            } catch (error) {
                console.error("Error fetching members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading || latestMembers.length === 0) {
        return null;
    }

    return (
        <motion.section
            className="w-full flex justify-center items-start flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h2 className="text-lg mb-4 font-light">Latest Members</h2>

            <div className="flex space-x-4 flex-wrap">
                {latestMembers.map((member, i) => (
                    <div key={i} className="text-center">
                        <img
                            src={member.image_url || "https://res.cloudinary.com/stackover/image/upload/v1748493790/defaultUser_a0mokq.jpg"}
                            alt={member.first_name}
                            className="w-13 h-13 rounded-full border-2 border-indigo-500 mx-auto"
                        />
                        <p className="text-sm mt-2 font-semibold">{member.first_name}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default ActiveMembers;
