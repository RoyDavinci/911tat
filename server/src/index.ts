import express from "express";
import cors from "cors";
import helmet from "helmet";
import sessionInstance from "./common/session";
import passport from "passport";
import {passportService} from "./common/passport";
import serviceNotFoundHandler from "./common/serviceNotFoundHandler";
import healthRouter from "./controllers/health/health.service";
import apiV1Router from "./routes/routes";

const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
app.use(sessionInstance);
passportService(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", healthRouter);
app.use("/api/v1", apiV1Router);
app.use(serviceNotFoundHandler);

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
});
