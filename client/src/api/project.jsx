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
        return response.data;
    } catch (error) {
        console.error('Error deleting the project:', error);
    }
}

export { createProjectFn, deleteProjectFn };