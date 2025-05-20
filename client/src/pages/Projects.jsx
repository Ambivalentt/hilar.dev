import ProjectList from "../components/dashboard/ProjectList.jsx";
import { Folder } from "lucide-react";
import { useProjectContext } from "../context/projectContext.jsx";
import { useState, useEffect } from "react";
import CreateProjectForm from "../components/dashboard/CreateProjectForm.jsx";


const Projects = () => {

    const { getProjectsByUser, getProjectsFn } = useProjectContext();

    useEffect(() => {
         getProjectsFn();
    }, []);


    return (
        <section>
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">
                    Overview of your projects, tasks, comments, and activity logs.
                </p>
                <CreateProjectForm getProjectsFn={getProjectsFn} />
            </header>
            <h2 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
                <Folder size={24} /> My Projects
            </h2>
            <ProjectList projects={getProjectsByUser}  />
        </section>
    )
}

export default Projects;