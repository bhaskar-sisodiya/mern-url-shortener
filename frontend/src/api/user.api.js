// user.api.js
import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (email, password) => {
    const {data} = await axiosInstance.post("/api/auth/login", {email, password});
    return data;
}

export const registerUser = async (name, email, password) => {
    const {data} = await axiosInstance.post("/api/auth/register", {name, email, password});
    return data;
}

export const logoutUser = async () => {
    const {data} = await axiosInstance.post("/api/auth/logout");
    return data;
}

export const getCurrentUser = async () => {
    try {
        const {data} = await axiosInstance.get("/api/auth/me");
        return data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            return null;
        }
        throw err;
    }
}

export const getAllUserUrls = async () => {
    const {data} = await axiosInstance.post("/api/user/urls");
    return data;
}