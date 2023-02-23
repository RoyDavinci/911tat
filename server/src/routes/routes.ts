import {Router} from "express";
import {userRouter} from "../controllers";

const apiV1Router = Router();

apiV1Router.use("/user", userRouter);

export default apiV1Router;
