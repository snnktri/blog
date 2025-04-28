import { api } from "../utils/axiosInstance";

export const singup = async (data) => {
    try {
        const response = await api.post("/users/signup", data);
        return response.data;
    } catch (error) {
        console.error("Error on singup: ", error);
    }
}

export const login = async (loginData) => {
    try {
        const response = await api.post("/users/login", loginData);
        return response.data;
    } catch (error) {
        console.error("Error on login: ", error);
    }
}