import axios from "axios";

const kycApi = axios.create({
    baseURL: "http://localhost:8083",
});

kycApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default kycApi;



