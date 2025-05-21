import React, { useState, useEffect } from "react";
import { getRecentUsers } from "../api/users.jsx";

const ActiveMembers = () => {
    const [latestMembers, setLatestMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getRecentUsers();
                setLatestMembers(response.users);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, [])

    return (
        <section className="mb-12 ">
            <h2 className="text-2xl font-bold mb-4">Latest Members</h2>
            <div className="flex space-x-4">
            
                {latestMembers.map((member, i) => (
                    <div key={i} className="text-center">
                        <img
                            src={member.image_url}
                            alt={member.first_name}
                            className="w-16 h-16 rounded-full border-2 border-indigo-500 mx-auto"
                        />
                        <p className="text-sm mt-2">{member.name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ActiveMembers