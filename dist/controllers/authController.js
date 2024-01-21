"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePass = exports.resetPass = exports.forgetPass = exports.logout = exports.login = exports.Emailvalidation = exports.register = exports.akka = void 0;
const sendMail_1 = require("../utils/sendMail");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const express_validator_1 = require("express-validator");
// @desc    user login
// @path    POST /login
// @access  private
const akka = async (req, res) => {
    if (req.user) {
        res
            .status(200)
            .json({ msg: `im portected and you managed to reach me ${req.user}` });
    }
    else {
        res.status(401).send("Unauthorized");
    }
};
exports.akka = akka;
// @desc    user registration
// @path    POST /register
// @access  public
const register = async (req, res) => {
    const { username, email, password } = (0, express_validator_1.matchedData)(req);
    // checking the validation errors
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        return res
            .status(400)
            .json({ ValidationError: "All Fields Required", errorResult }); // 400 bad request
    }
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = new userModel_1.default({
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
        const url = `http://localhost:3030/email/${emailToken}`;
        sendMail_1.mailOptions["to"] = user.email;
        sendMail_1.mailOptions.html = `Please click the link to confirm your email: <a href="${url}">${url}</a>`;
        //
        // Send the email
        const info = sendMail_1.transporter.sendMail(sendMail_1.mailOptions);
        res.send("Email sent successfully!");
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
exports.register = register;
// @desc    user email validation
// @path    POST /email
// @access  private
const Emailvalidation = async (req, res) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.params.emailToken, process.env.EMAIL_SECRET);
        await userModel_1.default.updateOne({ _id: decoded.userId }, { emailConfirmed: true });
        res.status(200).json("your email has been confirmed ");
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.Emailvalidation = Emailvalidation;
// @desc    user login
// @path    POST /login
// @access  public
const login = async (req, res) => {
    // matchedDate witll return an object no matter what how many fields you valdiate it will always return and object
    const { email, password } = (0, express_validator_1.matchedData)(req);
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        return res.status(400).json({ ValidationError: errorResult }); // 400 bad request
    }
    // checking if a use exist with that email
    try {
        const user = await userModel_1.default.findOne({ email: email });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return res.status(400).json({ error: "Email or Password incorect" });
        }
        // found user and will check if did manage to confirm his email
        if (!user.emailConfirmed) {
            return res
                .status(403)
                .json({ error: "Please confirm your email addresss to login!" });
        }
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
    catch (error) {
        res.status(500).json({ error: "Something Went Wrong" });
    }
};
exports.login = login;
// @desc    user login
// @path    POST /login
// @access  public
const logout = async (req, res) => {
    if (req.user) {
        res.clearCookie("loginCookie");
        res.status(200).json({ msg: "logout seccessfull" });
    }
    else {
        res.status(401).json({ error: "Unauthorized" });
    }
};
exports.logout = logout;
// TODO: * rebuild and rethink the forget password feature
// @desc    user login
// @path    POST /login
// @access  public
const forgetPass = async (req, res) => {
    const { email } = (0, express_validator_1.matchedData)(req);
    try {
        const user = await userModel_1.default.findOne({ email: email });
        if (user) {
            // creating a password reset token and sending it thorugh an email
            const passToken = jsonwebtoken_1.default.sign({
                userId: user.id,
            }, process.env.EMAIL_SECRET, {
                expiresIn: "1d",
            });
            const url = `http://localhost:3030/reset/${passToken}`;
            sendMail_1.mailOptions["to"] = user.email;
            sendMail_1.mailOptions.html = `Please click the link to update your password: <a href="${url}">${url}</a>`;
            //
            // Send the email
            const info = sendMail_1.transporter.sendMail(sendMail_1.mailOptions);
            res.json({
                msg: `${user.username} please check you email inbox we sent a password recovery link to you `,
            });
        }
    }
    catch (error) {
        res.json({ error: error });
    }
};
exports.forgetPass = forgetPass;
// @desc    user login
// @path    POST /login
// @access  public
const resetPass = async (req, res) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.params.passToken, process.env.EMAIL_SECRET);
        res.status(200).json({ userId: decoded.userId });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.resetPass = resetPass;
const updatePass = async (req, res) => {
    try {
        // TODO: * await the result then return or not?
        const { password } = (0, express_validator_1.matchedData)(req);
        const hashedPass = await bcryptjs_1.default.hash(password, 12);
        // WARN: * which is better finByIdAndUpdate or UpdateOne
        await userModel_1.default.findByIdAndUpdate(req.params.userId, { password: hashedPass });
        res.status(200).json({ msg: "password updated" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.updatePass = updatePass;
//# sourceMappingURL=authController.js.map