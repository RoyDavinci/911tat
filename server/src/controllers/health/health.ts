import {Request, Response} from "express";

export const checkHealth = async (req: Request, res: Response) =>
    res.status(200).json({
        uptime: process.uptime(),
        responseTime: process.hrtime(),
        message: "server running",
        timestamp: Date.now(),
    });
