import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'hilardev-production.up.railway.app'
});

export default axiosInstance;