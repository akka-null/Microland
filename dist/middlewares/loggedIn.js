"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.loginCookie;
    if (!token) {
        return res.status(401).json({ "errorMsg": "login first" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_TOKEN);
        const user = await userModel_1.default.findById(decoded.userId, '-password');
        if (user) {
            req.user = user;
            next();
        }
    }
    catch (error) {
        res.clearCookie("loginCookie");
        return res.status(500).json({ error });
    }
};
exports.isLoggedIn = isLoggedIn;
exports.default = exports.isLoggedIn;
//# sourceMappingURL=loggedIn.js.map