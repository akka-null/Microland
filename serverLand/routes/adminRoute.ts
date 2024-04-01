import { Router } from "express";
const router = Router();
import * as adminController from "../controllers/adminController";
import isLoggedIn from "../middlewares/loggedIn";
import isAdmin from "../middlewares/isadmin";
import { body, param } from "express-validator";

// add product
// update product
router.route("/product")
    .post(isLoggedIn, isAdmin, adminController.addProd)
    .patch(
        isLoggedIn,
        isAdmin,
        body("prodId").isMongoId().withMessage("invalid ID"),
        adminController.PatchProd);

// delete product
router.delete('/product/:prodId',
    isLoggedIn,
    isAdmin,
    param("prodId").isMongoId().withMessage("invalid ID"),
    adminController.DeleteProd);

// get all users
router.get('/users', isLoggedIn, isAdmin, adminController.GetUsers);

// update user profile to admin i guess
// delete user 
router.route("/user/:userId")
    .patch(
        isLoggedIn,
        isAdmin,
        param("userId").isMongoId().withMessage("invalid ID"),
        adminController.MakeAdmin)
    .delete(
        isLoggedIn,
        isAdmin,
        param("userId").isMongoId().withMessage("invalid ID"),
        adminController.DeleteUser);


// get orders
router.get("/orders/", isLoggedIn, isAdmin, adminController.getAllOrders);

router.patch("/orders/:orderId/deliver",
    isLoggedIn,
    isAdmin,
    param("orderId").isMongoId().withMessage("invalid ID"),
    adminController.deliveredOrder);


export default router;
