import {Request, Response} from "express";
import HTTP_STATUS_CODE from "../../constants/httpCodes";
import {prisma} from "../../db/prisma";
import bcrypt from "bcryptjs";
import {logger} from "../../utils/logger";
import {Prisma} from "@prisma/client";

export const registerAsClient = async (req: Request, res: Response) => {
    const {email, password, username} = req.body;

    try {
        const findUser = await prisma.users.findUnique({where: {email}});
        if (findUser) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const createClient = await prisma.client.create({data: {email, username}});
        const newUser = await prisma.users.create({
            data: {client_id: createClient.client_id, username, email, password: hashedPassword},
        });
        return res.status(200).json({
            message: "user created",
            user: {id: newUser.user_id, username: newUser.username, email: newUser.email},
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user"});
    }
};

export const registerAsEscort = async (req: Request, res: Response) => {
    const {phone, email, username, password} = req.body;
    try {
        const findUser = await prisma.users.findUnique({where: {email}});
        if (findUser) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user already exists"});
        const hashedPassword = await bcrypt.hash(password, 10);
        const createEscort = await prisma.escorts.create({data: {email, username, phone}});
        const newUser = await prisma.users.create({
            data: {escort_id: createEscort.escort_id, email, username, password: hashedPassword, phone},
        });

        return res.status(200).json({
            message: "user created",
            user: {id: newUser.user_id, username: newUser.username, email: newUser.email, phone: newUser.phone},
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            logger.info(e);
            if (e.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user"});
    }
};

export const blacklistUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!req.user) return res.status(400).json({message: "no authenticated user"});
    const {adminId} = req.user;
    try {
        const findAdmin = await prisma.users.findFirst({where: {adminId}});
        if (!findAdmin) return res.status(400).json({message: "addmin does not exist"});
        const findUser = await prisma.users.findUnique({where: {user_id: Number(id)}});
        if (!findUser) return res.status(400).json({message: "user not found"});
        await prisma.users.update({where: {user_id: Number(id)}, data: {accountStatus: 123456789}});
        return res.status(400).json({message: "user banned"});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user"});
    }
};
