/* eslint-disable import/prefer-default-export */
import {Router} from "express";
import {authenticateAdminJWT, authenticateJWT} from "../../common/authenticate";
import * as controllers from "./subscriptions.controllers";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authenticateJWT, controllers.getSubscription);
subscriptionRouter.get("/subscriptions", authenticateJWT, controllers.getSubscriptions);
subscriptionRouter.post("/unverify-user", authenticateAdminJWT, controllers.unSubscribeUser);

export {subscriptionRouter};
