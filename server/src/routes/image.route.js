import { Router } from "express";
import { imageUploader } from "../controllers/Image.controller.js";
import { uploade } from "../middelwares/multer.middelware.js";

const router = Router();

router.route("/uploadImage").post(
    uploade.single('image'),
    imageUploader
)

export default router;