"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPass = exports.logout = exports.login = exports.Emailvalidation = exports.register = void 0;
const sendMail_1 = require("../utils/sendMail");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const express_validator_1 = require("express-validator");
const register = async (req, res, next) => {
    const { username, email, password } = (0, express_validator_1.matchedData)(req);
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = new userModel_1.User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        await user.save();
        const emailToken = jsonwebtoken_1.default.sign({ userId: user.id, }, process.env.EMAIL_SECRET, { expiresIn: "1d", });
        const base_url = (process.env.NODE_ENV === "development") ? "http://" + req.hostname + ":" + process.env.PORT : "https://" + req.hostname;
        const url = `${base_url}/email/${emailToken}`;
        sendMail_1.mailOptions["to"] = user.email;
        sendMail_1.mailOptions.subject = "Email Confirmation";
        sendMail_1.mailOptions.html = `Please click the link to confirm your email: <a href="${url}">${url}</a>`;
        await sendMail_1.transporter.sendMail(sendMail_1.mailOptions);
        res.json({ msg: "Email sent successfully, Pleas confirm your account, check your inbox or spams!" });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const Emailvalidation = async (req, res, next) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.params.emailToken, process.env.EMAIL_SECRET);
        await userModel_1.User.updateOne({ _id: decoded.userId }, { emailVerified: true });
        res.status(200).json({ msg: "your email has been confirmed " });
    }
    catch (error) {
        res.status(400);
        next(Error('Invalid or expired token'));
    }
};
exports.Emailvalidation = Emailvalidation;
const login = async (req, res, next) => {
    const { email, password } = (0, express_validator_1.matchedData)(req);
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const user = await userModel_1.User.findOne({ email: email });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(400);
            next(Error('Email or Password Incorrect'));
        }
        else if (!user.emailVerified) {
            res.status(403);
            next(Error('Confirm Your Email Address to login!'));
        }
        else {
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN, {
                expiresIn: "30m",
            });
            res.cookie("loginCookie", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development",
                maxAge: 1000 * 60 * 30,
            })
                .status(200).json({ msg: "login succesfully!" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const logout = async (_req, res) => {
    res.clearCookie("loginCookie");
    res.status(200).json({ msg: "logout seccessfull" });
};
exports.logout = logout;
const forgetPass = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    const { email } = (0, express_validator_1.matchedData)(req);
    try {
        const user = await userModel_1.User.findOne({ email: email });
        if (user) {
            const passToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.EMAIL_SECRET, { expiresIn: "3m" });
            const base_url = (process.env.NODE_ENV === "development") ? "http://" + req.hostname + ":" + process.env.PORT : "https://" + req.hostname;
            const url = `${base_url}/reset/${passToken}`;
            sendMail_1.mailOptions["to"] = user.email;
            sendMail_1.mailOptions.subject = "Password Reset";
            sendMail_1.mailOptions.html = `Please click the link to update your password: <a href="${url}">${url}</a>`;
            await sendMail_1.transporter.sendMail(sendMail_1.mailOptions);
            res.json({
                msg: `${user.username} please check you email inbox or spams, we sent a password recovery link to you `,
            });
        }
        else {
            res.status(400);
            next(Error("We're sorry. We weren't able to identify you"));
        }
    }
    catch (error) {
        next(error);
    }
};
exports.forgetPass = forgetPass;
const resetPassword = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const { password } = (0, express_validator_1.matchedData)(req);
        const hashedPass = await bcryptjs_1.default.hash(password, 12);
        const decoded = jsonwebtoken_1.default.verify(req.params.passToken, process.env.EMAIL_SECRET);
        const user = await userModel_1.User.findByIdAndUpdate(decoded.userId, { password: hashedPass });
        if (!user) {
            res.status(400);
            return next(Error('User Not Found'));
        }
        res.status(200).json({ msg: "password updated" });
    }
    catch (error) {
        res.status(400);
        next(Error('Invalid or expired token'));
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map