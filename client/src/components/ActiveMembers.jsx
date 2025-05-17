const members = [
  { name: "María", avatar: "https://i.pravatar.cc/100?img=1" },
  { name: "Carlos", avatar: "https://i.pravatar.cc/100?img=2" },
  { name: "Lucía", avatar: "https://i.pravatar.cc/100?img=3" },
];


const ActiveMembers = () => {
    return (
        <section className="mb-12 ">
            <h2 className="text-2xl font-bold mb-4">Active Members</h2>
            <div className="flex space-x-4">
                {members.map((member, i) => (
                    <div key={i} className="text-center">
                        <img
                            src={member.avatar}
                            alt={member.name}
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