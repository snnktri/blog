import express from "express"
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.ORIGIN
}));

app.use(express.json({
    extends: true,
   // limit: '100mb'
}
));

app.use(express.urlencoded({
    extended: true,
    // limit: '100mb'
}))

app.use(express.static("public"));

app.use(cookieParser());

// routers goes here
import imageRouter from "./routes/image.route.js"
import userRouter from "./routes/user.route.js"
import blogRouter from "./routes/blog.route.js"

app.use('/api/v1/users', userRouter);
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/blogs', blogRouter);


export {app};