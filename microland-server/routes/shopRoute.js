import { Router } from "express";

const router = Router();
import shopController from "../controllers/shopController.js";

router.get('/products', shopController.getProducts);
router.get('/product/:prodId', shopController.getProductById);

export default router;



