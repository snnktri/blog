import { Router } from "express";
import { verifyJWT } from "../middelwares/auth.middelware.js";
import { uploade } from "../middelwares/multer.middelware.js";
import { login, logout, protectedUser, signUp  } from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(
    uploade.single('profile'),
    signUp
);

router.route("/login").post(
    login
);

router.route("/protected").get(
    verifyJWT,
    protectedUser
);

router.route("/logout").get(
    verifyJWT,
    logout
);


export default router;