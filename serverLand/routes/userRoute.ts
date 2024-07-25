import { Router } from "express";
const router = Router();
import { body, param } from "express-validator";
import * as userController from "../controllers/userController";
import isCostumer from "../middlewares/iscostumer";
import isLoggedIn from "../middlewares/loggedIn";
import isAdmin from "../middlewares/isadmin";
import isVerified from "../middlewares/isVerified";

// TODO: user related
// get profile
router.route("/user")
    .get(isLoggedIn, userController.myProfile)
    .delete(isLoggedIn, isVerified, userController.deleteMe)
    // NOTE: udpate account
    //      - think about what he can update and what not ==> username, email, password.
    //      - username: check for unique username before allowing the update
    //      - email:
    //           1- send email to the old email to verify the new one ?? ==> send informative email to the old one
    //           2- send email to the new email to verify the new one ?? ==> send confirmation email to the new one
    //      - password: provide the old and the new password.
    // TODO: wht to update ??
    .patch(isLoggedIn, isVerified, userController.udpateMyProfile);


// TODO: review related not sure if we should add it or not
// update review should be alowed within the first  24h
// delete review should be alowed within the first  24h

router.post("/review/:prodId",
    isLoggedIn,
    isVerified,
    isCostumer,
    body("rate").isIn(["1", "2", "3", "4", "5"]).withMessage("1-5 are allowed as rating values"),
    param("prodId").isMongoId().withMessage("invalid ID"),
    userController.postReview);


// add order
router.post("/orders/",
    isLoggedIn,
    isVerified,
    isCostumer,
    body("email").trim().escape().isEmail().withMessage("Please use a valid E-mail address"),
    body("firstName").trim().escape(),
    body("lastName").trim().escape(),
    body("phone").trim().escape().isMobilePhone('ar-DZ').withMessage('not an algerian number'),
    userController.addOrder);

// get my orders
router.get("/orders/mine", isLoggedIn, isVerified, isCostumer, userController.getOrders);

// get order by id
router.route("/orders/:orderId")
    .get(
        isLoggedIn,
        isVerified,
        param("orderId").isMongoId().withMessage("invalid ID"),
        userController.getOrderById)
    .post( 
        isLoggedIn,
        isVerified,
        isCostumer,
        param("orderId").isMongoId().withMessage("invalid ID"),
        userController.payOrder); 

// WARN: pay order this from the browser just for testing and redirecting 
router.get("/orders/:orderId/pay/akka",
    param("orderId").isMongoId().withMessage("invalid ID"),
    userController.payOrder);

export default router;
