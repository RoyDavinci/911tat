/* eslint-disable import/no-extraneous-dependencies */
import {Express, Request, Response} from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import logger from "./logger";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "911tat",
            version: "1.0.0",
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["../routes/routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    logger.info(`docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
