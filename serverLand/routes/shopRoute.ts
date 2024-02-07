import { Router } from "express";
const router = Router();
import * as shopController from "../controllers/shopController";
import isCostumer from "../middlewares/iscostumer";
import isLoggedIn from "../middlewares/loggedIn";
import { body } from "express-validator";
import isValidId from "../middlewares/isvalidid";

router.get("/products", shopController.getProducts);
router.get("/product/:prodId", shopController.getProductById);

router.get("/products/:productType", shopController.getProductByType);
router.get("/products/:productType/:productCategory", shopController.getProductByCategory);

router.post("/review/:prodId",
    isValidId,
    body("rate").isIn(["1", "2", "3", "4", "5"]).withMessage("1-5 are allowed as rating values"),
    isLoggedIn,
    isCostumer,
    shopController.postReview);

// costumer orders
// create an order
// router.post("/order", shopController.postOrder);
// costumer see all the past orders
// router.get("/orders", shopController.getOrders); 

// admin orders
// see all the pending orders
// see all the orders

export default router;
