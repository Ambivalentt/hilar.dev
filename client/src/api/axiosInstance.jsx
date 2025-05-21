import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://hilar-backend.onrender.com'
    // baseURL: 'http://localhost:3000'
});

export default axiosInstance;