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
// @desc    user registration
// @path    POST /register
// @access  public
const register = async (req, res, next) => {
    const { username, email, password } = (0, express_validator_1.matchedData)(req);
    // checking the validation errors
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = new userModel_1.User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        await user.save();
        // creating a token for confirmation email
        const emailToken = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, process.env.EMAIL_SECRET, {
            expiresIn: "1d",
        });
        // TODO: work on the emial template
        const url = `http://localhost:3030/email/${emailToken}`;
        sendMail_1.mailOptions["to"] = user.email;
        sendMail_1.mailOptions.html = `Please click the link to confirm your email: <a href="${url}">${url}</a>`;
        //
        // Send the email
        const info = sendMail_1.transporter.sendMail(sendMail_1.mailOptions);
        res.send("Email sent successfully, Pleas confirm you account, check your inbox or spams!");
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
// @desc    user email validation
// @path    POST /email
// @access  private
const Emailvalidation = async (req, res, next) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.params.emailToken, process.env.EMAIL_SECRET);
        await userModel_1.User.updateOne({ _id: decoded.userId }, { emailConfirmed: true });
        res.status(200).json("your email has been confirmed ");
    }
    catch (error) {
        next(Error('link is expired!'));
        // next(error); // this will yells "jwt expired"
    }
};
exports.Emailvalidation = Emailvalidation;
// @desc    user login
// @path    POST /login
// @access  public
const login = async (req, res, next) => {
    // matchedDate witll return an object no matter what how many fields you valdiate it will always return and object
    const { email, password } = (0, express_validator_1.matchedData)(req);
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        next(Error(errorResult.array()[0]?.msg));
    }
    // checking if a use exist with that email
    try {
        const user = await userModel_1.User.findOne({ email: email });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(400);
            next(Error('Email or Password Incorrect'));
        }
        // found user and will check if did manage to confirm his email
        else if (!user.emailConfirmed) {
            res.status(403);
            next(Error('Confirm Your Email Address to login!'));
        }
        else {
            // found a user  create an httpONly cookie
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN, {
                expiresIn: "5m",
            });
            res.cookie("loginCookie", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development", // we are in dev so dev !== dev will give false
                // NOTE: * if you don't set the maxAge it will be a session coookie
                maxAge: 1000 * 60 * 5, // ms i want to give it 2 min
            })
                .status(200).json({ msg: "login succesfully!" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// @desc    user login
// @path    POST /login
// @access  public
const logout = async (_req, res) => {
    res.clearCookie("loginCookie");
    res.status(200).json({ msg: "logout seccessfull" });
};
exports.logout = logout;
// TODO: * rebuild and rethink the forget password feature
const forgetPass = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        next(Error(errorResult.array()[0]?.msg));
    }
    const { email } = (0, express_validator_1.matchedData)(req);
    try {
        const user = await userModel_1.User.findOne({ email: email });
        if (user) {
            // creating a password reset token and sending it thorugh an email
            const passToken = jsonwebtoken_1.default.sign({
                userId: user.id,
            }, process.env.EMAIL_SECRET, {
                expiresIn: "1d",
            });
            // const url = `http://localhost:3030/reset/${passToken}`;
            const url = `${req.hostname}:${process.env.PORT}/reset/${passToken}`;
            sendMail_1.mailOptions["to"] = user.email;
            sendMail_1.mailOptions.html = `Please click the link to update your password: <a = href="${url}">${url}</a>`;
            //
            // Send the email
            const info = sendMail_1.transporter.sendMail(sendMail_1.mailOptions);
            res.json({
                msg: `${user.username} please check you email inbox or spams, we sent a password recovery link to you `,
            });
        }
        else {
            res.status(400).json({ message: "We're sorry. We weren't able to identify you" });
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
        next(Error(errorResult.array()[0]?.msg));
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
        next(error);
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map