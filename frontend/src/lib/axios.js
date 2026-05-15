import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true // * With this browser will send cookies on every request
});
