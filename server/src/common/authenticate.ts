import {Request, Response, NextFunction} from "express";
import passport from "passport";
import STATUS_CODES from "../constants/httpCodes";
import {logger} from "../utils/logger";

export const authenticateLocal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return passport.authenticate("local", (error: Error, user: Express.User, info: {message: string}) => {
            logger.info("na here e dey");
            if (error) return res.status(400).json({message: info.message, error: error.message});
            logger.info(error);
            if (!user) {
                logger.info(user);

                return res.status(400).json({message: info.message});
            }

            return req.logIn(user, err => {
                if (err) return res.status(400).json({message: info.message, error: err.message});

                return next();
            });
        })(req, res, next);
    } catch (error) {
        logger.error(error);

        return res.status(STATUS_CODES.NOT_ACCEPTABLE).json({message: "wrong username/password", error});
    }
};

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
        return next({
            statusCode: STATUS_CODES.PROXY_AUTHENTICATION_REQUIRED,
            message: "header token needed",
        });

    return passport.authenticate("jwt", (error: Error, user: Express.User) => {
        if (error) {
            return res.status(STATUS_CODES.FORBIDDEN).json({message: error.message, data: "error"});
        }
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({message: "user does not exist ooh"});

        return req.logIn(user, err => {
            if (err) return res.status(STATUS_CODES.FORBIDDEN).json({message: err.message});

            return next();
        });
    })(req, res, next);
};

export const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        return passport.authenticate("jwt", (error: Error, user: Express.User, info: {message: string}) => {
            if (error)
                return res.status(STATUS_CODES.INSUFFICIENT_STORAGE).json({message: error.message, data: "error"});
            if (!user) return res.status(STATUS_CODES.INSUFFICIENT_STORAGE).json({message: info.message});

            return req.logIn(user, err => {
                if (err) return res.status(STATUS_CODES.INSUFFICIENT_STORAGE).json({message: err.message});

                return next();
            });
        })(req, res, next);
    }

    return next();
};

export const authenticateAdminJWT = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
        return next({statusCode: STATUS_CODES.PROXY_AUTHENTICATION_REQUIRED, message: "admin authorization needed"});

    return passport.authenticate("jwt", (error: Error, user: Express.User, info: {message: string}) => {
        if (error) return next({statusCode: STATUS_CODES.FORBIDDEN, message: error.message});
        if (!user) return next({statusCode: STATUS_CODES.NOT_FOUND, message: info.message});
        if (!user.adminId) return next({statusCode: STATUS_CODES.FORBIDDEN, message: "unauthorized"});
        return req.logIn(user, err => {
            if (err) return next({statusCode: STATUS_CODES.FORBIDDEN, message: err.message});
            return next();
        });
    })(req, res, next);
};
