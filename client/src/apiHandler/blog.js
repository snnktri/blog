import { api } from "../utils/axiosInstance";

export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/blogs/getById/${id}`);
        return response.data;
    } catch (error) {
        
    }
}