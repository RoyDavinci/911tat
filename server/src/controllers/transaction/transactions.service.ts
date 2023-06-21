/* eslint-disable import/prefer-default-export */
import {Router} from "express";
import {authenticateAdminJWT, authenticateJWT} from "../../common/authenticate";
import * as controllers from "./transaction.controllers";

const transactionRouter = Router();

transactionRouter.get("/", authenticateAdminJWT, controllers.getAllTransactions);
transactionRouter.post("/pay", authenticateJWT, controllers.createTransaction);
transactionRouter.post("/verify/:transactionId", authenticateJWT, controllers.checkTransaction);

export {transactionRouter};
