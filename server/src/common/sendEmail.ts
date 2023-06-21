/* eslint-disable no-promise-executor-return */
import nodemailer from "nodemailer";
import config from "../config";
import logger from "../utils/logger";

const transporter = nodemailer.createTransport({...config.mail});

// eslint-disable-next-line require-await
export const sendEmail = async (to: string | undefined, subject: string, body: string) =>
    new Promise((resolve, reject) => {
        const mailOptions = {
            from: config.mail.auth.user,
            to,
            subject,
            html: body,
        };
        try {
            const data = transporter.sendMail(mailOptions);
            logger.info(JSON.stringify(data));

            return resolve(true);
        } catch (error) {
            return reject(new Error("error processing data"));
        }
    });

export default sendEmail;
