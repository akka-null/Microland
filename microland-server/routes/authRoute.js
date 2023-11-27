import { Router } from "express";
import authController from "../controllers/authController.js";
const router = Router();

// TODO: 
// - [ ]  add a username validation && sanatize
// - [ ]  add a email validation && sanatize
// - [ ]  add password and confirmPassword

// signup  || register
router.post('/register', authController.signup);
// login || signin
router.post('/login', authController.signin);
// logout || sigout
router.post('/logout', authController.signout);
// register with google account Oauth

export default router;
