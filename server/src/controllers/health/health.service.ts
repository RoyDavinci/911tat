import {Router} from "express";
import {checkHealth} from "./health";

const healthRouter = Router();

healthRouter.get("/", checkHealth);

export default healthRouter;
