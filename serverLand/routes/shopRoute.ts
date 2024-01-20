import { Router } from "express";

const router = Router();
import * as shopController from "../controllers/shopController";

router.get("/products", shopController.getProducts);
router.get("/product/:prodId", shopController.getProductById);

router.get("/products/:productType", shopController.getProductByType);
router.get("/products/:productType/:productCategory", shopController.getProductByCategory);

router.post("/order", shopController.postOrder);
router.get("/orders", shopController.getOrders);

export default router;
