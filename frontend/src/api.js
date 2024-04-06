// interceptor (using axios)
// intercept any request check for access and add.

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// creates the axios element we can refer to from now on
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// adds an interceptor to url pathway.
// if access_token, will add as header to authorise.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default api