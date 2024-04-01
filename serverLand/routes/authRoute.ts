// FIX: * make sure all the routes all working (here and in postman)
import { Router } from "express";
import { body } from "express-validator";
import * as authController from "../controllers/authController";
import { User } from "../models/userModel";
import isLoggedIn from "../middlewares/loggedIn";
const router = Router();

// signup  
router.post(
    "/register",
    body("username")
        .trim()
        .escape()
        .custom(async (name) => {
            const oldName = await User.findOne({ username: name });
            if (oldName) {
                throw new Error("Username already exists");
            }
        }),
    body("email")
        .trim()
        .escape()
        .isEmail()
        .withMessage("Please use a valid E-mail address")
        .custom(async (mail) => {
            const oldEmail = await User.findOne({ email: mail });
            if (oldEmail) {
                throw new Error("E-mail already in use");
            }
        }),
    body("password", "please use a password at least with 5 characters").isLength(
        { min: 5 }
    ),
    body("confirmPassword").custom(async (confirmPass, { req }) => {
        if (confirmPass !== req.body.password) {
            throw new Error("Passwords do not match!");
        }
    }),
    authController.register
);

// login
router.post(
    "/login",
    body("email")
        .trim()
        .escape()
        .isEmail()
        .withMessage("Please use a valid E-mail address"), // email validation / sanitazing
    body("password").trim(),
    authController.login
);

// email validation
router.get("/email/:emailToken", authController.Emailvalidation);

// logout || signout
router.post("/logout", isLoggedIn, authController.logout);

// forget passsword
router.post(
    "/forget",
    body("email")
        .trim()
        .escape()
        .isEmail()
        .withMessage("Please use a valid E-mail address"),
    authController.forgetPass
);
// reset the password after getting the token
router.post("/reset/:passToken",
    body("password", "please use a password at least with 5 characters").isLength(
        { min: 5 }
    ),
    body("confirmPassword").custom(async (confirmPass, { req }) => {
        if (confirmPass !== req.body.password) {
            throw new Error("Passwords do not match!");
        }
    }),
    authController.resetPassword);

// TODO: google Oauth
export default router;
