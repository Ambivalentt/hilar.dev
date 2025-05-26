import ProjectList from "../components/dashboard/ProjectList.jsx";
import { Folder, Plus } from "lucide-react";
import { useProjectContext } from "../context/projectContext.jsx";
import { useState, useEffect } from "react";
import CreateProjectForm from "../components/dashboard/CreateProjectForm.jsx";
import { useNavigate } from "react-router-dom";

const Projects = () => {
    const [deletingId, setDeletingId] = useState(null);
    const { getProjectsByUser, getProjectsFn, deleteAndUpdateProjects } = useProjectContext();
    const [showCreateProject, setShowCreateProject] = useState(false);
    

    useEffect(() => {
         getProjectsFn();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        await deleteAndUpdateProjects({id});
        setDeletingId(null);
    };

    const handleCreateProject = (e) => {
        e.preventDefault();
        setShowCreateProject(prev => !prev);
    };
    const navigate = useNavigate();
    const onProjectSelect = (project) => {
        navigate(`/dashboard/project/${project.project_id}`);
    }

    return (
        <section className="ps-1">
            <header className="mb-10 border-b border-gray-700 pb-6">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">
                    Overview of your projects, tasks, comments, and activity logs.
                </p>
                <button onClick={handleCreateProject} className="mt-4 cursor-pointer flex items-center gap-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition">
                    New Project <Plus className="inline" size={18} strokeWidth="3" />
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        showCreateProject ? "max-h-[1000px] opacity-100 scale-100 mt-6" : "max-h-0 opacity-0 scale-95"}`}>
                    {showCreateProject && <CreateProjectForm getProjectsFn={getProjectsFn} setShowCreateProject={setShowCreateProject} />}
                </div>
            </header>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Folder size={24} /> My Projects
            </h2>
            {getProjectsByUser.length === 0 && (
                <p className="text-gray-400">No projects found. Create a new one!</p>
            )}
            <ProjectList onSelect={onProjectSelect} projects={getProjectsByUser} onDelete={handleDelete} deletingId={deletingId} /> 
        </section>
    );
};

export default Projects;
