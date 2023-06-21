import joi from "joi";
/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
    .object({
        MAIL_USERNAME: joi.string(),
        MAIL_PASSWORD: joi.string(),
        MAIL_SERVICE: joi.string(),
    })
    .unknown()
    .required();

/**
 * Validate the env variables using joi.validate()
 */
const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    mail: {
        service: envVars.MAIL_SERVICE,
        auth: {
            user: envVars.MAIL_USERNAME,
            pass: envVars.MAIL_PASSWORD,
        },
        bulkSMSToken: envVars.BULKSMS_NIGERIA_TOKEN,
    },
};
export default config;
