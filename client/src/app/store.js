import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/auth.sclice.js";
import blogReducer from "../feature/blog.slice.js"

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            blog: blogReducer
        }
    }
)