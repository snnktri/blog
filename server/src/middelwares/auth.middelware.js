import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";

dotenv.config(
    {
        path: "./.env"
    }
);

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["authorization"].replace("Bearer ", "");
        console.log(token);

        if(!token) {
            throw new ApiError(401, "Access token is missing or invalid");
        }
        const decoendToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoendToken);

        if(!decoendToken) {
            throw new ApiError(401, "Access token is missing or invalid");
        }

        const user = await User.findById(
            decoendToken.id)

        console.log(user);

        if(!user) {
            throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error on authenticate: ", error);
        next(error);
    }
}