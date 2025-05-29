import axiosInstance from './axiosInstance';

const getRecentActivity = async (projectId) => {
    try {
       const response = await axiosInstance.get(`/activity/project/${projectId}`,{
        withCredentials: true
       });
        return response.data.data
    } catch (error) {
      
        throw error;
    }
}

export { getRecentActivity };