import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'hilar-dev.railway.internal'
    // baseURL: 'http://localhost:3000'
});

export default axiosInstance;