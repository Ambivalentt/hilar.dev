import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {

    const [getProjectsByUser, setProjectsByUser] = useState([]);
    const [hasFetchedProjects, setHasFetchedProjects] = useState(false);
    const [loading, setLoading] = useState(false);

    const createProjectFn = async (projectData) => {
        try {
            const response = await axiosInstance.post('/project/create', projectData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error creating the project:', error);
        }
    }

    const getProjectsFn = async () => {

        try {
            const response = await axiosInstance.get('/project/getAllByUser', {
                withCredentials: true
            });
            setProjectsByUser(response.data.projects);
        } catch (error) {
            console.error('Error getting the projects:', error);
        }
    }
    return (
        <ProjectContext.Provider value={{ getProjectsByUser, getProjectsFn, createProjectFn }}>
            {children}
        </ProjectContext.Provider>
    );
}

const useProjectContext = () => React.useContext(ProjectContext);

export { ProjectProvider, useProjectContext };