import { Router } from "express";
import { createBlog, deleteBlog, updateBlog, getAllBlogs } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middelwares/auth.middelware.js";

const router = Router();

router.route("/createBlog").post(verifyJWT, createBlog);

router.route("/updateBlog/:id").put(verifyJWT, updateBlog);

router.route("/deleteBlog/:id").delete(verifyJWT, deleteBlog);

router.route("/getAllBlogs").get(verifyJWT,getAllBlogs);

export default router;