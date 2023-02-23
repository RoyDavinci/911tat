import Joi from "joi";
import dotenv from "dotenv-safe";

dotenv.config();

const envSchema = Joi.object({
    NODE_ENV: Joi.string().allow("development", "test", "production"),
    PORT: Joi.string().required(),
    SECRET: Joi.string().required(),
    TOKENEXPIRATIONTIME: Joi.string().required(),
    PAYSTACK_PUBLIC: Joi.string().required(),
    PASSPORT_SECRET: Joi.string().required(),
}).unknown();

const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const serverConfig = {
    env: envVars.NODE_ENV,
    isTest: envVars.NODE_ENV === "test",
    isDevelopment: envVars.NODE_ENV === "development",
    server: {
        port: envVars.PORT || "3900",
        secret: envVars.SECRET,
        tokenExpirationTime: envVars.TOKENEXPIRATIONTIME,
        PAYSTACK_PUBLIC: envVars.PAYSTACK_PUBLIC,
        PASSPORT_SECRET: envVars.PASSPORT_SECRET,
    },
};