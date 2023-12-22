import { Router } from "express";

const router = Router();
import shopController from "../controllers/shopController.js";

router.get("/products", shopController.getProducts);
router.get("/product/:prodId", shopController.getProductById);

router.get("/products/computer/:category", shopController.getComputerByCategory);
router.get("/products/parts/:partName", shopController.getpartByName);

export default router;
