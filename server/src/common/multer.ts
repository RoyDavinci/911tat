import {NextFunction, Response, Request} from "express";
import multer from "multer";
import logger from "../utils/logger";

function uploadArray(req: Request, res: Response, next: NextFunction) {
    try {
        const upload = multer({
            limits: {fileSize: 5 * 1024 * 1024, fieldSize: 5 * 1024 * 1024},
        }).array("images", 10);

        return upload(req, res, err => {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                logger.info(err);
                return res.status(400).json({message: err.message, error: err.name, success: false});
            }
            if (err) {
                logger.info(err);
                return res.status(400).json({message: err.message, success: false});
            }
            // Everything went fine.
            return next();
        });
    } catch (error) {
        logger.info(error);
        return res.status(400).json({message: "Error occured on upload", error});
    }
}

function uploadSingle(req: Request, res: Response, next: NextFunction) {
    try {
        const upload = multer({
            limits: {fileSize: 5 * 1024 * 1024, fieldSize: 5 * 1024 * 1024},
        }).single("image");
        return upload(req, res, err => {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                logger.info("here");
                logger.info(err);
                return res.status(400).json({message: err.message, error: err});
            }
            if (err) {
                logger.info("we are here");
                logger.info(err);
                return res.status(400).json({message: "Error occured on upload", error: err});
            }
            // Everything went fine.
            return next();
        });
    } catch (error) {
        logger.info("we have gotten here");
        logger.info(error);
        return res.status(400).json({message: "Error occured on upload", error});
    }
}
function uploadVideo(req: Request, res: Response, next: NextFunction) {
    try {
        const upload = multer({
            limits: {fileSize: 100 * 1024 * 1024, fieldSize: 100 * 1024 * 1024},
        }).single("video");
        return upload(req, res, err => {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                logger.info(err);
                return res.status(400).json({message: err.message, error: err});
            }
            if (err) {
                logger.info(err);
                return res.status(400).json({message: err, error: err});
            }
            // Everything went fine.
            return next();
        });
    } catch (error) {
        logger.info(error);
        return res.status(400).json({message: "Error occured on upload", error});
    }
}
export {uploadArray, uploadSingle, uploadVideo};
