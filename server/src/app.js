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




export {app};