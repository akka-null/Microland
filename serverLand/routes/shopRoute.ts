import { Router } from "express";
const router = Router();
import * as shopController from "../controllers/shopController";
import match from "../middlewares/typeMatchCategory";
import { param } from "express-validator";

// get all products
/**
 * @openapi
 *
 * /api/products:
 *   get:
 *     produces:
 *       - application/json
 */
router.get("/products", shopController.getProducts);

// search
router.get("/search", shopController.search);
// TODO: navigation
// router.get("/nav", shopController.nav);


// get product by id
router.get("/product/:prodId",
    param("prodId").isMongoId().withMessage("invalid ID"),
    shopController.getProductById);

// get product
router.get("/products/:productType", shopController.getProductByType);
router.get("/products/:productType/:productCategory", match, shopController.getProductByCategory);

router.get("/top", shopController.topProds);
router.get("/latest", shopController.latestProd);

router.get("/orders/stripe/result", shopController.stripePaymentResult);
router.get("/orders/chargily/result/:result", shopController.chargilyPaymentResult);

// stripe webhook
// in app.ts

// chargily webhook
router.post("/orders/chargily/fulfill", shopController.chargilyFulfillOrder);

export default router;
