import { app } from "./app.js";
import connectDb from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
});

connectDb().
then(() => {
    app.listen(process.env.PORT||8070, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}).catch((err) => {
    console.error(`Error connecting to the database: `, err);
    process.exit(1);  // Exit with an error code of 1
})