import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://hilardev-production.up.railway.app/'
});

export default axiosInstance;