import {NextFunction, Response, Request} from "express";
import multer from "multer";
import {logger} from "../utils/logger";

function uploadArray(req: Request, res: Response, next: NextFunction) {
    try {
        let upload = multer({
            limits: {fileSize: 1 * 1024 * 1024, fieldSize: 10 * 1024 * 1024},
        }).array("product", 10);

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(400).json({message: "Error occured on upload", error: err});
            } else if (err) {
                return res.status(400).json({message: "Error occured on upload", error: err});
            }
            // Everything went fine.
            next();
        });
    } catch (error) {
        return res.status(400).json({message: "Error occured on upload", error});
    }
}

function uploadSingle(req: Request, res: Response, next: NextFunction) {
    try {
        let upload = multer({
            limits: {fileSize: 1 * 1024 * 1024, fieldSize: 10 * 1024 * 1024},
        }).single("image");
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(400).json({message: "Multer Error occured on upload ", error: err});
            } else if (err) {
                return res.status(400).json({message: "Error occured on upload", error: err});
            }
            // Everything went fine.
            next();
        });
    } catch (error) {
        return res.status(400).json({message: "Error occured on upload", error});
    }
}

export {uploadArray, uploadSingle};
