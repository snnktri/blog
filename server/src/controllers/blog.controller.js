import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const createBlog = asyncHandler( async (req, res) => {
    const { title, content, image='' } = req.body;
   // console.log(req.body);
    const user = req.user._id;
   // console.log(image)
    //console.log(user);

    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(401, "Unauthorized to create blog");
    }

    if(!title || !content) { 
        throw new ApiError(400, "Title and content are required");
    }

    const newBlog = await Blog.create({ title, content, image:image || '', author: user });

    return res.status(201).json(new ApiResponse(201, newBlog, "Blog created successfully"));
});

export const getAllBlogs = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const existUser = await User.findById(user);
    if(!existUser) {
        throw new ApiError(401, "Unauthorized to create blog");
    }

    const blogs = await Blog.find({ author:user }).sort({ createdAt: -1 });
    return res.status(200).json(
        new ApiResponse(200, blogs, "Blogs retrieved successfully")
    );
});

export const updateBlog = asyncHandler(async(req, res) => {
    const _id = req.params.id;
    const { title, content, image } = req.body;
    const user = req.user._id;

    console.log(_id);

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
    const deletedBlog = await Blog.findByIdAndDelete({
        _id,
        author: user
    });

    if(!deletedBlog) {
        throw new ApiError(404, "Blog not found");
    }
    return res.status(200).json(new ApiResponse(200, "Blog deleted successfully"));
});

export const getAllBlogsOfAllUsers = asyncHandler(async(req, res) => {
    const blogs = await Blog.aggregate([
        {
            $lookup: {
                from: "users",
                localField: 'author',
                foreignField: '_id',
                as: 'authorinfo'
            }
        },
        { $unwind: "$authorinfo" }, 
        {
            $lookup: {
                from: "images",
                localField: 'image',
                foreignField: '_id',
                as: 'imageinfo'
            }
        },
        { $unwind: 
           { path: "$imageinfo", 
                preserveNullAndEmptyArrays: true 
           }
         },  
        { 
            $sort: { "authorinfo.userName": 1, "created_at": -1 } 
        },
        {
            $project: {
                title: 1,
                content: 1,
                image: "$imageinfo.imageUrl",
                author: { userName: "$authorinfo.userName", email: "$authorinfo.email" }
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, blogs, "Blogs retrieved successfully")
    );
});

export const getBlogById = asyncHandler(async(req, res) => {
    const _id = req.params.id;

    const blog = await Blog.findById(_id);
    if(!blog) {
        throw new ApiError(404, "Not found");
    }

    return res.status(200).
    json(
        new ApiResponse(200, blog, "Blog find")
    );
})
