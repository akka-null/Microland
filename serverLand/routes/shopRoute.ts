import { Router } from "express";
const router = Router();
import * as shopController from "../controllers/shopController";
import match from "../middlewares/typeMatchCategory";
import { param } from "express-validator";
import bodyParser from "body-parser";

// get all products
router.get("/products", shopController.getProducts);

// get product by id
router.get("/product/:prodId",
    param("prodId").isMongoId().withMessage("invalid ID"),
    shopController.getProductById);

// get product
router.get("/products/:productType", shopController.getProductByType);
router.get("/products/:productType/:productCategory", match, shopController.getProductByCategory);

router.get("/top", shopController.topProds);
router.get("/latest", shopController.latestProd);

// TODO: stripe webhook to fulful the order 
router.get("/orders/stripe/result", shopController.orderPaymentResult);
router.post("/orders/stripe/fulfill", bodyParser.raw({ type: 'application/json' }), shopController.stripeFulfillOrder);

export default router;
