import { ErrorRequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config();

export const errorHandler: ErrorRequestHandler = async (err, _req, res, _next) => {
    let code = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(code).json({
        message: err.message,
        // stack: (process.env.NODE_ENV === 'development') ? err.stack : null
    });

}
export default errorHandler;
