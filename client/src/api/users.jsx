import axiosInstance from './axiosInstance.jsx';

const createUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data;

    } catch (error) {
        const errorMessage = error.response?.data?.error;
        throw new Error(errorMessage || 'an unknown error occurred while fetching data');
    }
}

const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/login', formData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error;
        throw new Error(errorMessage || 'an unknown error occurred while fetching data');
    }
}

export { createUser, loginUser };