import config from "../config";

export const emailLink = (token: string, validity?: string) => {
    if (validity) return `${config.server.FRONTEND_HOST}/verify/email?token=${token}&validity=${validity}`;

    return `${config.server.FRONTEND_HOST}/verify/email?token=${token}`;
};

export default emailLink;
