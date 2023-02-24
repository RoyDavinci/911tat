import serverConfig from "./server";
import mailConfig from "./mail";
import cloudinaryConfig from "./cloudinary";

const config = {...serverConfig, ...mailConfig, ...cloudinaryConfig};
export default config;
