import axios from "axios";

const accountApi = axios.create({
    baseURL: "http://localhost:8084",
});

accountApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default accountApi;