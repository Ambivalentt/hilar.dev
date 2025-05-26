import axiosInstance from "./axiosInstance";

const deleteTask = async (taskData) => {
    try {
        const response = await axiosInstance.delete('/tasks/delete', {
            data: taskData,
            withCredentials: true
        });
        console.log('Task deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data || 'An error occurred while creating the task';
        throw new Error(errorMessage.message);
    }
}

const addNewTaskProjectfn = async (projectId, taskData) => {
    try {
        console.log('Adding new task to project:', projectId, taskData);
        const response = await axiosInstance.post(`/tasks/project/${projectId}`, taskData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error adding task to project:', error);
    }
}

export { deleteTask, addNewTaskProjectfn };