import { api } from "../utils/axiosInstance";

export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/blogs/getById/${id}`);
        return response.data;
    } catch (error) {
        
    }
}

export const getAllBlog = async () => {
    try {
        const tok = localStorage.getItem("token");
        const response = await api.get(`/blogs/getAll`, {
            headers: {
                Authorization: `Bearer ${tok}`
            }
        })
    } catch (error) {
        
    }
}