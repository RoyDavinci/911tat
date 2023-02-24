import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import debug from "debug";
import passport from "passport";
import {v2 as cloudinary} from "cloudinary";
import sessionInstance from "./common/session";
import passportService from "./common/passport";
import serviceNotFoundHandler from "./common/serviceNotFoundHandler";
import healthRouter from "./controllers/health/health.service";
import apiV1Router from "./routes/routes";
import logger from "./utils/logger";
import config from "./config";
import createSuperAdminOnStartup from "./db/superAdmin";

const app = express();

function normalizePort(val: string) {
    const ports = parseInt(val, 10);
    if (Number.isNaN(ports)) {
        return val;
    }
    if (ports >= 0) {
        // ports number
        return ports;
    }
    return false;
}

const port = normalizePort(process.env.PORT || "4200");

cloudinary.config({
    cloud_name: config.cloudinaryConfig.CLOUDINARY_NAME,
    api_key: config.cloudinaryConfig.CLOUDINARY_API_KEY,
    api_secret: config.cloudinaryConfig.CLOUDNIARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
createSuperAdminOnStartup();
app.use(sessionInstance);
passportService(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", healthRouter);
app.use("/api/v1", apiV1Router);
app.use(serviceNotFoundHandler);

const server: http.Server = http.createServer(app);
const serverDebugger = debug("jekawin:server");

process.on("unhandledRejection", (reason, p) => logger.error("Unhandled Rejection at: Promise ", p, reason));

server.listen(port, () => {
    if (config.isDevelopment) logger.info(`server port: http://localhost:${port}`);
});

function onError(error: {syscall: string; code: string}) {
    if (error.syscall !== "listen") {
        throw new Error(`{message: ${error.syscall}, code: ${error.code}`);
    }
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        case "ELIFECYCLE":
            logger.error(`${bind}this happened instaed`);
            process.exit(1);
            break;
        default:
            logger.info("this happened instead");
            throw new Error(`{message: ${error.syscall}, code: ${error.code}`);
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
    serverDebugger(`Listening on ${bind}`);
}

server.on("error", onError);
server.on("listening", onListening);
