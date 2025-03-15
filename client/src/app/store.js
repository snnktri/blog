import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../feature/auth.sclice";

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
        }
    }
)