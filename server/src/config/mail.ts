import Joi from "joi";
import dotenv from "dotenv-safe";

dotenv.config();

const envSchema = Joi.object({
    MAIL_USERNAME: Joi.string().required(),
    MAIL_PASSWORD: Joi.string().required(),
    MAIL_SERVICE: Joi.string().required(),
})
    .unknown()
    .required();

const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const mailConfig = {
    mail: {
        MAIL_USERNAME: envVars.MAIL_USERNAME,
        MAIL_PASSWORD: envVars.MAIL_PASSWORD,
        MAIL_SERVICE: envVars.MAIL_SERVICE,
    },
};
