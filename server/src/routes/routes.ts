import {Router} from "express";
import {userRouter, transactionRouter} from "../controllers";

const apiV1Router = Router();

apiV1Router.use("/user", userRouter);
apiV1Router.use("/transaction", transactionRouter);

export default apiV1Router;
