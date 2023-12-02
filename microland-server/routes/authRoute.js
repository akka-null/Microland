import { Router } from "express";
import { body } from "express-validator";
import authController from "../controllers/authController.js";
import User from "../models/userModel.js";
import loggedin from "../middlewares/loggedIn.js";

const router = Router();

// TODO:
// - [ ] add a username validation && sanatize
// - [ ] add a email validation && sanatize
// - [ ] add password and confirmPassword
// - [ ] forget password
// - [ ] reset password
// - asign jwt to a new user
// FIX:  check if email already in use || username already in use || learn if it's okay to check both

// signup  || register
router.post("/akka", loggedin, authController.akka);

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
  body("password", "Please use a valid password").isLength({ min: 5 }),
  authController.login
);

// email validation
router.get("/email/:emailToken", authController.Emailvalidation);

// logout || signout
router.post("/logout", loggedin, authController.logout);

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

// updating passsword
// will take :
// token ==> check the token and resonpond with email of that token so to reset the password
router.get("/reset/:passToken", authController.resetPass);

// udpate password
router.post("/updatePass/:userId", authController.updatePass);
// register with google account Oauth

export default router;
