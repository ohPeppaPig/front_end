import axios from 'axios';

const instance  = axios.create({
    baseURL: process.env.VUE_APP_DOMAIN,
    timeout: 10000,
    withCredentials: true
});

instance.interceptors.response.use((response) => {
    return response && response.data;
}, (error) => {
    return Promise.reject(error);
});

export default instance;