"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const errorHandler = async (err, _req, res, _next) => {
    let code = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(code).json({
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
//# sourceMappingURL=errorhandler.js.map