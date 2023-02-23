import joi from "joi";
import dotenv from "dotenv-safe";

dotenv.config();
const envSchema = joi
    .object({
        CLOUDINARY_NAME: joi.string(),
        CLOUDINARY_API_KEY: joi.string(),
        CLOUDNIARY_API_SECRET: joi.string(),
    })
    .unknown()
    .required();

const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    cloudinaryConfig: {
        CLOUDINARY_NAME: envVars.CLOUDINARY_NAME,
        CLOUDINARY_API_KEY: envVars.CLOUDINARY_API_KEY,
        CLOUDNIARY_API_SECRET: envVars.CLOUDNIARY_API_SECRET,
    },
};
export default config;
