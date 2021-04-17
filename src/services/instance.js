import axios from 'axios';

// axios.defaults.withCredentials = true;//Cookie跨域
axios.default.withCredentials = true;
const instance  = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 10000,
    withCredentials: true
});

instance.interceptors.response.use((response) => {
    return response && response.data;
}, (error) => {
    return Promise.reject(error);
});

export default instance;