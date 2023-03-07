/* eslint-disable import/prefer-default-export */
import {Router} from "express";
import {authenticateJWT} from "../../common/authenticate";
import * as controllers from "./transaction.controllers";

const transactionRouter = Router();

transactionRouter.post("/pay", authenticateJWT, controllers.createTransaction);
transactionRouter.post("/verify/:transactionId", authenticateJWT, controllers.checkTransaction);

export {transactionRouter};
