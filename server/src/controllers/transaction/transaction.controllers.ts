/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import {users} from "@prisma/client";
import {Request, Response} from "express";
import {v4 as uuid} from "uuid";
import axios from "axios";
import config from "../../config";
import HTTP_STATUS_CODE from "../../constants/httpCodes";
import prisma from "../../db/prisma";
import logger from "../../utils/logger";
import {paystackResponse, paystackResponseVerification} from "./transaction.interfaces";

export async function createTransaction(req: Request, res: Response) {
    const {user_id} = req.user as users;
    const {amount} = req.body;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not found", success: false});
        const {data} = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {amount, email: findUser.email},
            {
                headers: {
                    Authorization: `Bearer ${config.server.PASSPORT_SECRET}`,
                },
            }
        );
        const response = data as paystackResponse;
        if (response.status) {
            const newOrder = await prisma.transactions.create({
                data: {
                    userId: user_id,
                    phone: findUser.phone,
                    email: findUser.email,
                    payment_type: "Online",
                    biller_Reference: response.data.reference,
                    transaction_reference: uuid(),
                    amount,
                },
            });
            return res
                .status(200)
                .json({link: response.data.authorization_url, transactionId: newOrder.transactionId, success: true});
        }
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", success: false});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function checkTransaction(req: Request, res: Response) {
    const {transactionId} = req.params;
    const {user_id} = req.user as users;
    try {
        const getTransaction = await prisma.transactions.findUnique({where: {transactionId: Number(transactionId)}});
        if (!getTransaction)
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "transaction does not exist"});
        const {data} = await axios.get(
            `https://api.paystack.co/transaction/verify/${getTransaction.biller_Reference}`,
            {headers: {Authorization: `Bearer ${config.server.PASSPORT_SECRET}`}}
        );
        const response = data as paystackResponseVerification;
        if (response.data.status === "success") {
            await prisma.transactions.update({
                where: {transactionId: Number(transactionId)},
                data: {transaction_status: "successful"},
            });
            await prisma.users.update({where: {user_id}, data: {isVerified: true}});
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({messgae: "user updated", success: true});
        }

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({meessgae: "an error occured", success: false});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}
