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
        const errorMessage = error.response?.data;
        throw new Error(errorMessage.message || 'an unknown error occurred while fetching data');
    }
}

const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/login', formData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log('response from loginUser', response);
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data || ' an problem occurred while logging in';
        throw new Error(errorMessage.message);
    }
}

const refreshToken = async () => {
    try {
        const response = await axiosInstance.get('/user/refreshToken', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data || 'an problem occurred while refreshing the token';
        throw new Error(errorMessage.message);
    }
}


export { createUser, loginUser, refreshToken };