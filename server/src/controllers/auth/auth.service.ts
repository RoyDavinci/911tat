import {Router} from "express";
import * as middlewares from "./auth.middlewares";
import * as controllers from "./auth.controllers";
import {uploadArray, uploadSingle, uploadVideo} from "../../common/multer";
import {authenticateAdminJWT, authenticateJWT, authenticateLocal} from "../../common/authenticate";

const userRouter = Router();

userRouter.get("/", controllers.getAllEscorts);
userRouter.get("/dashboard/:username", controllers.getSingleEscort);
userRouter.get("/test", controllers.getData);
userRouter.get("/:username", controllers.getEscort);
userRouter.post("/register-as-escort", middlewares.escortCreateValidator, controllers.registerAsEscort);
userRouter.post("/profile-image", authenticateJWT, uploadSingle, controllers.upLoadImage);
userRouter.post("/login", authenticateLocal, controllers.login);
userRouter.post("/forgot-password", controllers.sendCode);
userRouter.post("/resend-otp", authenticateJWT, controllers.resendCode);
userRouter.post("/verify-password-code", controllers.verifyForgotPasswordCode);
userRouter.patch("/upload-profile-photo", authenticateJWT, uploadSingle, controllers.updateProfileImage);
userRouter.post("/blacklist/:id", authenticateAdminJWT, controllers.blacklistUser);
userRouter.patch("/update-escort-profile", authenticateJWT, controllers.updateProfileDetails);
userRouter.patch("/update-images", authenticateJWT, uploadArray, controllers.uploadImages);
userRouter.patch("/update-profile-images", authenticateJWT, uploadArray, controllers.uploadImagesOnSignUp);
userRouter.patch("/unblacklist/:id", authenticateAdminJWT, controllers.unblaclikstUser);
userRouter.patch("/delete-images", authenticateJWT, controllers.deleteUserImage);
userRouter.patch("/upload-video", uploadVideo, authenticateJWT, controllers.uploadVideo);
userRouter.patch("/increase-view/:username", controllers.increaseView);
userRouter.delete("/delete-user/:id", authenticateAdminJWT, controllers.deleteUser);
userRouter.post("/delete/escort/:id", authenticateAdminJWT, controllers.deleteUser);
userRouter.post("/search", controllers.searchUser);
userRouter.post("/verify-email-token", authenticateJWT, controllers.verifyEmailToken);
userRouter.post("/add/review/:username", controllers.addReview);
userRouter.patch("/phase-one", authenticateJWT, controllers.phaseOne);
userRouter.patch("/phase-two", authenticateJWT, controllers.phaseTwo);
userRouter.patch("/phase-three", authenticateJWT, controllers.phaseThree);
userRouter.patch("/phase-four", authenticateJWT, controllers.phaseFour);
userRouter.patch("/delete-video", authenticateJWT, controllers.deleteVideo);
userRouter.patch("/update-password", authenticateJWT, controllers.updatePassword);
userRouter.patch("/user-update-client-password", controllers.updateClientPassword);

// eslint-disable-next-line import/prefer-default-export
export {userRouter};
