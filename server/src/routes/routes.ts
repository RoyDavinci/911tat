import {Router} from "express";
import {userRouter, transactionRouter, adminRouter, subscriptionRouter} from "../controllers";

const apiV1Router = Router();

apiV1Router.use("/user", userRouter);
apiV1Router.use("/transaction", transactionRouter);
apiV1Router.use("/admin", adminRouter);
apiV1Router.use("/subscription", subscriptionRouter);

export default apiV1Router;
