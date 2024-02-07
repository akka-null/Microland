"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = async (err, _req, res, _next) => {
    let statusCode = res.status === 200 ? 500 : res.status;
    let message = err.message;
    res.status(400).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};
exports.default = errorHandler;
//# sourceMappingURL=error.js.map