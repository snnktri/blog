import { db_name } from "../contant.js";
import mongoose from "mongoose";

//db connection

const connectDb = async() => {
    try {
        const connectionINstance = await mongoose.connect(`${process.env.DB_URL}/${db_name}`);
        console.log(`Connected to ${connectionINstance.connection.name} database`);
    } catch (error) {
        console.error("Error connecting to db: "+error.message);
        exit(1);
    }

}

export default connectDb;