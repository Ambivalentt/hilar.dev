import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { deleteProjectFn } from "../api/project.jsx";
const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {

    const [getProjectsByUser, setProjectsByUser] = useState([]);
    const [hasFetchedProjects, setHasFetchedProjects] = useState(false);
    const [loading, setLoading] = useState(false);


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
    const deleteAndUpdateProjects = async ({ id }) => {
        //optimizacion de la eliminacion de un proyecto
        const projects = [...getProjectsByUser];
        setProjectsByUser(projects.filter((project) => project.project_id !== id));
        //filtramos el proyecto que queremos eliminar
        //y lo eliminamos de la lista de proyectos
        try {
            //llamamos a la funcion de eliminar el proyecto
            await deleteProjectFn(id);
        }catch (error) {
            //si hay error, devolvemos el estado previo
            console.error('Error deleting the project:', error);
            setProjectsByUser(projects);
        }
    }

    return (
        <ProjectContext.Provider value={{ getProjectsByUser, getProjectsFn, deleteAndUpdateProjects }}>
            {children}
        </ProjectContext.Provider>
    );
}

const useProjectContext = () => React.useContext(ProjectContext);

export { ProjectProvider, useProjectContext };