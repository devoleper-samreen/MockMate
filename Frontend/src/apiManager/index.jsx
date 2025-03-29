import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

//Axios instance
const AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Content-Type": "multipart/form-data"
    }
});

// Success & Error Handling
AxiosInstance.interceptors.response.use(
    (response) => {

        return response.data;
    },
    (error) => {
        console.error("API Error:", error.response?.data?.message || error.message);
        return Promise.reject(error.response?.data || error);
    }
);

export default AxiosInstance;
