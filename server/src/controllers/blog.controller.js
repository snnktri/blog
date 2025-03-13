import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const createBlog = asyncHandler( async (req, res) => {
    const { title, content, image } = req.body;
    const user = req.user._id;

    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(401, "Unauthorized to create blog");
    }

    if(!title || !content) { 
        throw new ApiError(400, "Title and content are required");
    }

    const newBlog = await Blog.create({ title, content, image, author: user });

    return res.status(201).json(new ApiResponse(201, newBlog, "Blog created successfully"));
});

export const getAllBlogs = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(401, "Unauthorized to create blog");
    }

    const blogs = await Blog.find({ author:user }).sort({ createdAt: -1 });
});

export const updateBlog = asyncHandler(async(req, res) => {
    const _id = req.params.id;
    const { title, content, image } = req.body;
    const user = req.user._id;

    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(401, "Unauthorized to create blog");
    }


    if(!_id) {
        throw new ApiError(400, "Invalid blog ID");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(_id, { title, content, image }, { new: true });

    if(!updatedBlog) {
        throw new ApiError(404, "Blog not found");
    }

    return res.status(200).json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

export const deleteBlog = asyncHandler(async(req, res) => {
    const _id = req.params.id;
    const user = req.user._id;
    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(401, "Unauthorized to create blog");
    }
    const deletedBlog = await Blog.findByIdAndDelete(_id);

    if(!deletedBlog) {
        throw new ApiError(404, "Blog not found");
    }
});
