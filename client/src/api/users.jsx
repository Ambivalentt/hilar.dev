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
        const errorMessage = error?.response?.data?.error || ' an problem occurred while logging in';
        throw new Error(errorMessage);
    }
}

const refreshToken = async () => {
    try {
        const response = await axiosInstance.get('/user/refreshToken', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.error || 'an problem occurred while refreshing the token';
        throw new Error(errorMessage);
    }
}


export { createUser, loginUser, refreshToken };