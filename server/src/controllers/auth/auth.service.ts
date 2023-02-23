import {Router} from "express";
import * as middlewares from "./auth.middlewares";
import * as controllers from "./auth.controllers";

const userRouter = Router();

userRouter.post("/register-as-escort", middlewares.escortCreateValidator, controllers.registerAsEscort);
userRouter.post("/register-as-client", middlewares.clientCreateValidator, controllers.registerAsClient);
userRouter.post("/login", controllers.login);

export {userRouter};
