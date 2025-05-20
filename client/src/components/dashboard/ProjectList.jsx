import { Eye, Folder, } from "lucide-react";

const ProjectList = ({projects}) => {
  
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-600 text-amber-100";
            case "paused":
                return "bg-gray-600 text-gray-300";
            default:
                return "bg-gray-600 text-gray-300";
        }
    }
    return (
        <section className="mb-12">
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p) => (
                    
                    <div key={p.project_id} className="bg-gray-800 border cursor-pointer border-indigo-700 rounded-xl p-6 shadow-lg flex flex-col justify-between hover:shadow-cyan-500/50 transition-shadow">
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-300">{p.title}</h3>
                            <p className="mt-2 text-gray-300">{p.description}</p>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
                            <span>{p.total_users} members</span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold  ${getStatusColor(p.status)}`}>
                                {p.status}
                            </span>
                        </div>

                        <button
                            className="mt-4 flex items-center gap-2 self-start bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition"
                            type="button"
                        >
                            <Eye size={16} /> View Details
                        </button>
                    </div>
                ))}
            </div>
        </section>

    );

}

export default ProjectList;