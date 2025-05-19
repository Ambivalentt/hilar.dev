import { Eye, Folder,  } from "lucide-react";

const Projects = ({ project }) => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
                <Folder size={24} /> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.map((project) => (
                    <div key={project.id} className="bg-gray-800 border border-indigo-700 rounded-xl p-6 shadow-lg flex flex-col justify-between hover:shadow-cyan-500/50 transition-shadow">
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-300">{project.name}</h3>
                            <p className="mt-2 text-gray-300">{project.description}</p>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
                            <span>{project.members} members</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${project.status === "Active"
                                    ? "bg-amber-600 text-amber-100"
                                    : "bg-gray-600 text-gray-300"
                                    }`}
                            >
                                {project.status}
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

export default Projects;