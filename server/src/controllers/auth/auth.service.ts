import {Router} from "express";
import * as middlewares from "./auth.middlewares";
import * as controllers from "./auth.controllers";
import {uploadArray, uploadSingle} from "../../common/multer";
import {authenticateAdminJWT, authenticateJWT, authenticateLocal} from "../../common/authenticate";

const userRouter = Router();

userRouter.get("/", controllers.getAllEscorts);
userRouter.get("/:id", controllers.getEscort);
userRouter.post("/register-as-escort", middlewares.escortCreateValidator, controllers.registerAsEscort);
userRouter.post("/profile-image", authenticateJWT, uploadSingle, controllers.upLoadImage);
userRouter.post("/login", authenticateLocal, controllers.login);
userRouter.patch("/upload-profile-photo", authenticateJWT, uploadSingle, controllers.updateProfileImage);
userRouter.post("/blaclkist/:id", authenticateAdminJWT, controllers.blacklistUser);
userRouter.patch("/update-escort-profile", authenticateJWT, controllers.updateProfileDetails);
userRouter.patch("/update-images", authenticateJWT, uploadArray, controllers.uploadImages);
userRouter.patch("/unblacklist/:id", authenticateAdminJWT, controllers.unblaclikstUser);

// eslint-disable-next-line import/prefer-default-export
export {userRouter};
