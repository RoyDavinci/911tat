import {serverConfig} from "./server";
import {mailConfig} from "./mail";
import cloudinaryConfig from "./cloudinary";

export const config = {...serverConfig, ...mailConfig, ...cloudinaryConfig};
