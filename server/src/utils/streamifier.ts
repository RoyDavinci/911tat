/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
import {UploadApiErrorResponse, UploadApiResponse, UploadStream, v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import logger from "./logger";

const streamUpload = (req: Buffer): Promise<UploadApiErrorResponse | UploadApiResponse> => {
    logger.info("gotten to stream upload");

    return new Promise((resolve, reject) => {
        const stream: UploadStream = cloudinary.uploader.upload_stream(
            {timeout: 60000, resource_type: "auto",},
            (error, result) => {
                if (result) {
                    return resolve(result);
                }

                return reject(error);
            }
        );

        if (!req) return {message: "please pass a file"};

        return streamifier.createReadStream(req).pipe(stream);
    });
};
export default streamUpload;
