import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://hilar-backend.onrender.com',
});

export default axiosInstance;