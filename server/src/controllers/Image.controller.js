import { Image } from "../models/image.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudninary.js";

export const imageUploader = asyncHandler(async (req, res) => {
   // console.log(req.file);
    const  image = req.file;
       
    if(!image) {
        throw new ApiError(404, "Image not found");
    }

    const imageUrl = await uploadOnCloudinary(image.path);
    if(!imageUrl) {
        throw new ApiError(500, "Failed to upload image to cloudinary");
    }

    const newImage = await Image.create({ imageUrl:imageUrl?.url });

    return res.status(200).
    json(new ApiResponse(200, newImage, "Image uploaded successfully")
    );
    
})