/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {Prisma, users} from "@prisma/client";
import jwt from "jsonwebtoken";
import HTTP_STATUS_CODE from "../../constants/httpCodes";
import prisma from "../../db/prisma";
import logger from "../../utils/logger";
import {IUser} from "./auth.interfaces";
import config from "../../config";
import streamUpload from "../../utils/streamifier";

export const registerAsClient = async (req: Request, res: Response) => {
    const {email, password, username} = req.body;

    try {
        const findUser = await prisma.users.findUnique({where: {email}});
        if (findUser)
            return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user already exists", success: false});

        const hashedPassword = await bcrypt.hash(password, 10);
        const createClient = await prisma.client.create({data: {email, username}});
        const newUser = await prisma.users.create({
            data: {client_id: createClient.client_id, username, email, password: hashedPassword},
        });
        return res.status(200).json({
            message: "user created",
            user: {id: newUser.user_id, username: newUser.username, email: newUser.email},
            success: true,
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};

export const registerAsEscort = async (req: Request, res: Response) => {
    const {phone, email, username, password} = req.body;
    try {
        const findUser = await prisma.users.findUnique({where: {email}});
        if (findUser)
            return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user already exists", success: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        const createEscort = await prisma.escorts.create({data: {email, username, phone}});
        const newUser = await prisma.users.create({
            data: {escort_id: createEscort.escort_id, email, username, password: hashedPassword, phone},
        });

        return res.status(200).json({
            message: "user created",
            user: {id: newUser.user_id, username: newUser.username, email: newUser.email, phone: newUser.phone},
            success: true,
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            logger.info(e);
            if (e.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};

export const blacklistUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {adminId} = req.user as unknown as IUser;
    try {
        const findAdmin = await prisma.users.findFirst({where: {adminId}});
        if (!findAdmin) return res.status(400).json({message: "addmin does not exist", success: false});
        const findUser = await prisma.users.findUnique({where: {user_id: Number(id)}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        await prisma.users.update({where: {user_id: Number(id)}, data: {accountStatus: 123456789}});
        return res.status(400).json({message: "user banned", success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};

export async function unblaclikstUser(req: Request, res: Response) {
    const {id} = req.params;
    const {adminId} = req.user as unknown as IUser;
    try {
        const findAdmin = await prisma.users.findFirst({where: {adminId}});
        if (!findAdmin) return res.status(400).json({message: "addmin does not exist", success: false});
        const findUser = await prisma.users.findUnique({where: {user_id: Number(id)}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        await prisma.users.update({where: {user_id: Number(id)}, data: {accountStatus: 1234567890}});
        return res.status(400).json({message: "user banned", success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export const login = async (req: Request, res: Response) => {
    const {user_id, adminId} = req.user as unknown as IUser;
    try {
        if (adminId) {
            const findAdmin = await prisma.users.findUnique({where: {adminId}});
            if (!findAdmin) return res.status(400).json({message: "admin not found"});
            const token = jwt.sign({id: findAdmin.user_id}, config.server.secret);
            return res.status(200).json({message: "login successful", success: true, user: {findAdmin}, token});
        }
        const findUser = await prisma.users.findUnique({where: {user_id}});

        if (!findUser) return res.status(400).json({message: "user not found"});
        const token = jwt.sign({id: findUser.user_id}, config.server.secret);
        return res.status(200).json({message: "login successful", success: true, user: findUser, token});
    } catch (error) {
        logger.info(error);
        return res.status(400).json({message: "error on login", error, success: false});
    }
};

export const updateProfileImage = async (req: Request, res: Response) => {
    const {user_id} = req.user as unknown as IUser;

    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        if (!req.file) return res.status(400).json({message: "file needed", success: false});
        const data = await streamUpload(req.file.buffer);
        if (data.message)
            return res.status(data.http_code).json({message: "an error occured", err: data.message, success: false});
        const user = await prisma.users.update({where: {user_id}, data: {profilePhoto: data.secure_url}});
        return res.status(200).json({
            message: "photo updated",
            user,
            success: true,
        });
    } catch (error) {
        logger.info(error);
        return res.status(200).json({message: "an error occured on photo change", error, success: false});
    }
};

export async function updateProfileDetails(req: Request, res: Response) {
    const {
        city,
        state,
        country,
        build,
        height,
        bustsize,
        orientation,
        anal,
        oral,
        condom,
        smoke,
        ethnicity,
        age,
        shorttime,
        overnight,
    } = req.body;
    const {user_id, escort_id} = req.user as unknown as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const updateEscort = await prisma.escorts.update({
            where: {escort_id: Number(escort_id)},
            data: {
                BustSize: bustsize,
                orientation,
                oralSex: oral,
                city,
                state,
                country,
                ethnicity,
                smoke,
                age,
                shortTimeRate: shorttime,
                overNightRate: overnight,
                anal,
                condom,
                build,
                height,
            },
        });
        return res.status(200).json({message: "details updated", updateEscort, success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function uploadImages(req: Request, res: Response) {
    const {user_id} = req.user as unknown as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const files = req.files as Express.Multer.File[];
        if (files.length > 4 && !findUser.isVerified)
            return res
                .status(HTTP_STATUS_CODE.BAD_REQUEST)
                .json({message: "you have to be verified to upload more than four images", success: false});

        if (!findUser.escort_id)
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "user not an escort", success: false});
        // eslint-disable-next-line consistent-return
        files.forEach(async file => {
            const result = await streamUpload(file.buffer);
            if (result.message) return res.status(result.http_code).json({message: result.message, success: false});
            await prisma.images.create({data: {userId: findUser.escort_id, images: result.secure_url}});
        });
        return res.status(200).json({message: "images updated", success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function getEscort(req: Request, res: Response) {
    const {id} = req.params;
    try {
        const findUser = await prisma.escorts.findUnique({where: {escort_id: Number(id)}});
        if (!findUser) return res.status(400).json({message: "user not gotten", success: false});
        const escort = await prisma.escorts.findUniqueOrThrow({
            where: {escort_id: Number(id)},
            include: {Images: true},
        });
        return res.status(200).json({message: "escort gotten", success: true, escort});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function getAllEscorts(req: Request, res: Response) {
    try {
        const allEscort = await prisma.escorts.findMany({include: {Images: true}});
        return res.status(200).json({message: "escort gotten", allEscort, success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function getClient(req: Request, res: Response) {
    const {user_id} = req.user as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not found", success: false});
        return res.status(200).json({message: "user gotten", user: {findUser}});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}
export async function getAllClient(req: Request, res: Response) {
    try {
        const allEscort = await prisma.client.findMany({});
        return res.status(200).json({message: "escort gotten", allEscort, success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}
