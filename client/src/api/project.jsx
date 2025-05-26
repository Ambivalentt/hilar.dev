import axiosInstance from "./axiosInstance";


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


const deleteProjectFn = async (projectId) => {
    try {
        const response = await axiosInstance.delete('/project/delete', {
            data: { project_id: projectId },
            withCredentials: true
        });
    } catch (error) {
        console.error('Error deleting the project:', error);
    }
}

const getProjectByIdFn = async (projectId) => {
    try {
        const response = await axiosInstance.get(`/project/${projectId}`, {
            withCredentials: true
        });
        return response.data.project;
    } catch (error) {
        console.error('Error getting the project by id:', error);
    }
}

const getTasksByProjectIdFn = async (projectId) => {
    try {
        const response = await axiosInstance.get(`tasks/project/${projectId}`, {
            withCredentials: true
        });
        return response.data.data;
    } catch (error) {
        console.error('Error getting tasks by project id:', error);
    }
}



const getMembersFromProjectFn = async (projectId) => {
    try {
        const response = await axiosInstance.get(`/project/${projectId}/members`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error getting members from project:', error);
    }
}

export { createProjectFn, deleteProjectFn, getProjectByIdFn, getTasksByProjectIdFn, getMembersFromProjectFn };