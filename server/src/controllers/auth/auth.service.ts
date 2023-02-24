import {Router} from "express";
import * as middlewares from "./auth.middlewares";
import * as controllers from "./auth.controllers";
import {uploadSingle} from "../../common/multer";
import {authenticateAdminJWT, authenticateJWT, authenticateLocal} from "../../common/authenticate";

const userRouter = Router();

userRouter.post("/register-as-escort", middlewares.escortCreateValidator, controllers.registerAsEscort);
userRouter.post("/register-as-client", middlewares.clientCreateValidator, controllers.registerAsClient);
userRouter.post("/login", authenticateLocal, controllers.login);
userRouter.patch("/upload-profile-photo", authenticateJWT, uploadSingle, controllers.updateProfileImage);
userRouter.post("/blaclkist/:id", authenticateAdminJWT, controllers.blacklistUser);

export {userRouter};
