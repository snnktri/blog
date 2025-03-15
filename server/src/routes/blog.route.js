import { Router } from "express";
import { createBlog, deleteBlog, updateBlog, getAllBlogs, getAllBlogsOfAllUsers } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middelwares/auth.middelware.js";

const router = Router();

router.route("/createBlog").post(verifyJWT, createBlog);

router.route("/updateBlog/:id").put(verifyJWT, updateBlog);

router.route("/deleteBlog/:id").delete(verifyJWT, deleteBlog);

router.route("/getAllBlogs").get(verifyJWT,getAllBlogs);

router.route("/getAll").get(getAllBlogsOfAllUsers);

export default router;