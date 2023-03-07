import {NextFunction, Response, Request} from "express";
import multer from "multer";
import logger from "../utils/logger";

function uploadArray(req: Request, res: Response, next: NextFunction) {
    try {
        const upload = multer({
            limits: {fileSize: 1 * 1024 * 1024, fieldSize: 10 * 1024 * 1024},
        }).array("images", 10);

        return upload(req, res, err => {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                logger.info(err);
                return res.status(400).json({message: "Error occured on upload", error: err});
            }
            if (err) {
                logger.info(err);
                return res.status(400).json({message: "Error occured on upload", error: err});
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
            limits: {fileSize: 1 * 1024 * 1024, fieldSize: 10 * 1024 * 1024},
        }).single("image");
        return upload(req, res, err => {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                logger.info(err);
                return res.status(400).json({message: "Multer Error occured on upload ", error: err});
            }
            if (err) {
                logger.info(err);
                return res.status(400).json({message: "Error occured on upload", error: err});
            }
            // Everything went fine.
            return next();
        });
    } catch (error) {
        logger.info(error);
        return res.status(400).json({message: "Error occured on upload", error});
    }
}

export {uploadArray, uploadSingle};
