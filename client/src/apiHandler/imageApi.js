import { api } from "../utils/axiosInstance";

export const imageUploader = async (image) => {
    try {
       // console.log(image);
       // console.log("jello");
        const response = await api.post('/images/uploadImage', image,{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            }
        )
        return response.data;
    } catch (error) {
        console.error("Error uploading image. ", error.message);
    }
}
