// FIX: make sure all the routes all working (here and in postman)
import { Router } from "express";

const router = Router();
import shopController from "../controllers/shopController.js";


router.get("/products", shopController.getProducts);
router.get("/product/:prodId", shopController.getProductById);

router.get("/products/:productType", shopController.getProductByType);
router.get("/products/:productType/:productCategory", shopController.getProductByCategory);

// router.post("/orders", shopController);
export default router;
