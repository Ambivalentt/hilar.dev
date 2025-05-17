const tasks = [
    { title: "Fix login bug", status: "In progress" },
    { title: "Design dashboard UI", status: "Completed" },
    { title: "Refactor API routes", status: "Pending" },
];


const LatestTasks = () => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Latest Tasks</h2>
            <ul className="space-y-3">
                {tasks.map((task, i) => (
                    <li
                        key={i}
                        className="bg-slate-800 p-4 rounded-lg flex justify-between items-center border border-slate-700"
                    >
                        <span>{task.title}</span>
                        <span className="text-sm text-slate-400">{task.status}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default LatestTasks