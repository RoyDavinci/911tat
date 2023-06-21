/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import {subscribtions, users} from "@prisma/client";
import {Request, Response} from "express";
import HTTP_STATUS_CODE from "../../constants/httpCodes";
import prisma from "../../db/prisma";
import logger from "../../utils/logger";

export const getSubscription = async (req: Request, res: Response) => {
    const {user_id} = req.user as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const getSub = await prisma.subscribtions.findFirst({where: {user_id}});
        if (!getSub) return res.status(200).json({message: "user has no active subscriptions", success: false});
        return res.status(200).json({sub: getSub, success: true});
    } catch (error) {
        logger.info(error);
        return res.status(400).json({message: "an error occuredd", error, success: false});
    }
};

export async function getSubscriptions(req: Request, res: Response) {
    try {
        const subscriptions = await prisma.subscribtions.findMany({include: {users: true}});
        const data: (subscribtions & {
            users: users | null;
        })[] = [];
        for (let index = 0; index < subscriptions.length; index++) {
            const findUser = await prisma.users.findUnique({where: {user_id: subscriptions[index].user_id}});
            // logger.info(JSON.stringify(findUser));
            if (findUser) {
                const item = {...subscriptions[index], users: findUser};
                data.push(item);
            }
        }
        return res.status(200).json({data, message: "subscriptions gotten", success: true});
    } catch (error) {
        logger.info(error);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error, message: "an error occured on getting subscriptions", success: false});
    }
}

export async function unSubscribeUser(req: Request, res: Response) {
    const {email} = req.body;
    const {user_id} = req.user as users;
    try {
        const findUser = await prisma.users.findUnique({where: {email}});
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not found", success: false});
        if (!findAdmin || !findAdmin.adminId) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not found", success: false});
        }
        await prisma.users.update({where: {email}, data: {isVerified: false}});
        return res.status(200).json({message: "user unverified", success: true});
    } catch (error) {
        logger.info(error);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error, message: "an error occured on getting subscriptions", success: false});
    }
}

export default getSubscription;
