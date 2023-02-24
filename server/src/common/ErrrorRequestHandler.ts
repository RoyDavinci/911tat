import {ErrorRequestHandler} from "express";

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res) => {
    res.status(err.statusCode || 500).json({message: err.message, success: false, data: []});
};

export default errorHandler;
