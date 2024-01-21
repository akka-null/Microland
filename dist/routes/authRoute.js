"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FIX: * make sure all the routes all working (here and in postman)
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController = __importStar(require("../controllers/authController"));
const userModel_1 = __importDefault(require("../models/userModel"));
const loggedIn_1 = __importDefault(require("../middlewares/loggedIn"));
const router = (0, express_1.Router)();
// trying a protected route and must be logged in to reach it 
router.use("/akka", loggedIn_1.default, authController.akka);
// signup  || register
router.post("/register", (0, express_validator_1.body)("username")
    .trim()
    .escape()
    .custom(async (name) => {
    const oldName = await userModel_1.default.findOne({ username: name });
    if (oldName) {
        throw new Error("Username already exists");
    }
}), (0, express_validator_1.body)("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Please use a valid E-mail address")
    .custom(async (mail) => {
    const oldEmail = await userModel_1.default.findOne({ email: mail });
    if (oldEmail) {
        throw new Error("E-mail already in use");
    }
}), (0, express_validator_1.body)("password", "please use a password at least with 5 characters").isLength({ min: 5 }), (0, express_validator_1.body)("confirmPassword").custom(async (confirmPass, { req }) => {
    if (confirmPass !== req.body.password) {
        throw new Error("Passwords do not match!");
    }
}), authController.register);
// login
router.post("/login", (0, express_validator_1.body)("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Please use a valid E-mail address"), // email validation / sanitazing
(0, express_validator_1.body)("password", "Please use a valid password").isLength({ min: 5 }), authController.login);
// email validation
router.get("/email/:emailToken", authController.Emailvalidation);
// logout || signout
router.post("/logout", loggedIn_1.default, authController.logout);
// forget passsword
router.post("/forget", (0, express_validator_1.body)("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Please use a valid E-mail address"), authController.forgetPass);
// updating passsword
router.get("/reset/:passToken", authController.resetPass);
// update password
router.post("/updatePass/:userId", (0, express_validator_1.body)("password", "please use a password at least with 5 characters").isLength({ min: 5 }), (0, express_validator_1.body)("confirmPassword").custom(async (confirmPass, { req }) => {
    if (confirmPass !== req.body.password) {
        throw new Error("Passwords do not match!");
    }
}), authController.updatePass);
// TODO: @feature register with google account Oauth
exports.default = router;
//# sourceMappingURL=authRoute.js.map