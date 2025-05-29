import { CheckCircle } from "lucide-react";

const Tasks = ({ tasks }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-600 text-green-100";
            case "In_Progress":
                return "bg-cyan-600 text-cyan-100";
            default:
                return "bg-gray-600 text-gray-300";
        }
    };

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
                <CheckCircle size={24} /> Tasks
            </h2>
            <div className="overflow-x-auto rounded-lg border border-cyan-700">
                <table className="min-w-full divide-y divide-cyan-700">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-400 font-medium">Title</th>
                            <th className="px-6 py-3 text-left text-gray-400 font-medium">Assigned To</th>
                            <th className="px-6 py-3 text-left text-gray-400 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} className="border-b border-cyan-700 hover:bg-gray-700">
                                <td className="px-6 py-3 text-gray-300">{task.title}</td>
                                <td className="px-6 py-3 text-gray-300">{task.assignedTo}</td>
                                <td className="px-6 py-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                                        {task.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Tasks;
