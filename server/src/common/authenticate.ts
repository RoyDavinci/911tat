import {Request, Response, NextFunction} from "express";
import passport from "passport";
import STATUS_CODES from "../constants/httpCodes";

export const authenticateLocal = (req: Request, res: Response, next: NextFunction) => {
    try {
        return passport.authenticate("local", (error: Error, user: Express.User, info: {message: string}) => {
            if (error) return res.status(400).json({message: info.message, error: error.message});

            if (!user) {
                return res.status(400).json({message: info.message});
            }

            return req.logIn(user, err => {
                if (err) return res.status(400).json({message: info.message, error: err.message});

                return next();
            });
        })(req, res, next);
    } catch (error) {
        return res.status(STATUS_CODES.NOT_ACCEPTABLE).json({message: "wrong username/password", error});
    }
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(STATUS_CODES.PROXY_AUTHENTICATION_REQUIRED).json({message: "header token needed"});
    }

    return passport.authenticate("jwt", (error: Error, user: Express.User) => {
        if (error) {
            return res.status(STATUS_CODES.FORBIDDEN).json({message: error.message});
        }
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({message: "user not found"});
        return req.logIn(user, err => {
            if (err) return res.status(STATUS_CODES.FORBIDDEN).json({message: err.message});

            return next();
        });
    })(req, res, next);
};

export const optionalAuthenticate = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        return passport.authenticate("jwt", (error: Error, user: Express.User, info: {message: string}) => {
            if (error) return res.status(STATUS_CODES.INSUFFICIENT_STORAGE).json({message: error.message});
            if (!user) return res.status(STATUS_CODES.INSUFFICIENT_STORAGE).json({message: info.message});

            return req.logIn(user, err => {
                if (err) return res.status(STATUS_CODES.INSUFFICIENT_STORAGE).json({message: err.message});

                return next();
            });
        })(req, res, next);
    }

    return next();
};

export const authenticateAdminJWT = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
        return res
            .status(STATUS_CODES.PROXY_AUTHENTICATION_REQUIRED)
            .json({message: "admin authentication token needed"});

    return passport.authenticate("jwt", (error: Error, user: Express.User, info: {message: string}) => {
        if (error) return res.status(STATUS_CODES.FORBIDDEN).json({message: error.message, err: info.message});
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({message: "user does not exist ooh"});
        if (!user.adminId) return res.status(STATUS_CODES.FORBIDDEN).json({message: "user not authorized"});
        return req.logIn(user, err => {
            if (err) return res.status(STATUS_CODES.FORBIDDEN).json({message: err.message});
            return next();
        });
    })(req, res, next);
};
