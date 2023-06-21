/* eslint-disable import/prefer-default-export */
import {Router} from "express";
import {authenticateAdminJWT} from "../../common/authenticate";
import {uploadArray, uploadSingle, uploadVideo} from "../../common/multer";
import * as controllers from "./admin.controllers";

const adminRouter = Router();

adminRouter.get("/get-escort", controllers.getAllEscort);
adminRouter.get("/get-escort/:username", controllers.getEscort)
adminRouter.get("/all-reviews", controllers.getReviews);
adminRouter.get("/:username", authenticateAdminJWT, controllers.getAdmin);
adminRouter.get("/subscribe", authenticateAdminJWT, controllers.getSubscriptions);
adminRouter.post("/delete-reviews/:reviewId", authenticateAdminJWT, controllers.deleteReview);
adminRouter.post("/edit-reviews/:reviewId", authenticateAdminJWT, controllers.editReview);
adminRouter.post("/add-user", authenticateAdminJWT, controllers.addUser);
adminRouter.post("/verify", authenticateAdminJWT, controllers.verifyUser);
adminRouter.post("/update/userDetails/:username", authenticateAdminJWT, controllers.updateAdminProfileDetails);
adminRouter.patch("/user-image", authenticateAdminJWT, controllers.deleteUserImage);
adminRouter.patch(
    "/user/upload-profile-pic/:username",
    uploadSingle,
    authenticateAdminJWT,
    controllers.uploadProfilePic
);
adminRouter.patch("/user/upload-images/:username", uploadArray, authenticateAdminJWT, controllers.uploadImages);
adminRouter.patch("/upload-video/:username", uploadVideo, authenticateAdminJWT, controllers.uploadVideo);
adminRouter.patch("/delete-user-video/:username", authenticateAdminJWT, controllers.deleteVideo);

export {adminRouter};
