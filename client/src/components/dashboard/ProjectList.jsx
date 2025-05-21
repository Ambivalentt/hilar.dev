import { Eye, Folder, Delete, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteProjectFn } from "../../api/project.jsx";
import { useProjectContext } from "../../context/projectContext.jsx";

const ProjectList = ({ projects, onDelete, deletingId }) => {

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
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div
                        key={project.project_id}
                        className="bg-gray-800 border cursor-pointer border-indigo-700 rounded-xl p-6 shadow-lg flex flex-col justify-between hover:shadow-cyan-500/50 transition-shadow"
                    >
                        <header className="flex justify-between relative">
                            <div>
                                <h3 className="text-xl font-semibold text-indigo-300">{project.title}</h3>
                                <p className="mt-2 text-gray-300">{project.description}</p>
                            </div>
                            <button
                                onClick={() => onDelete(project.project_id)}
                                disabled={deletingId === project.project_id}
                                className={`rounded-full absolute cursor-pointer right-0 top-0 p-1 transition-transform duration-200
                  ${deletingId === project.project_id ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
                            >
                                {deletingId === project.project_id ? (
                                    <Loader2 className="animate-spin" size={24} color="white" />
                                ) : (
                                    <Delete color="white" size={30} />
                                )}
                            </button>
                        </header>

                        <main className="mt-4 flex items-center justify-between text-gray-400 text-sm">
                            <span>{project.total_users} members</span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
                            >
                                {project.status}
                            </span>
                        </main>

                        <button
                            className="mt-4 flex items-center gap-2 self-start bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition"
                            type="button"
                        >
                            <Eye size={16} /> View Details
                        </button>
                    </div>
                ))}
            </section>
        </section>

    );

}

export default ProjectList;