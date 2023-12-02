import { Router } from "express";
const router = Router();
import adminController from "../controllers/adminController.js";

router.get("/", adminController.getDashBoard);
router.post("/", adminController.addProd);

export default router;
