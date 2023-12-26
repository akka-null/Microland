// FIX: make sure all the routes all working (here and in postman)
import { Router } from "express";
const router = Router();
import adminController from "../controllers/adminController.js";
import isLoggedIn from "../middlewares/loggedIn.js";
import isAdmin from "../middlewares/isadmin.js";

// get /admin
router.get("/", isLoggedIn, isAdmin, adminController.getDashBoard);
// post /admin/product
router.post("/product", isLoggedIn, isAdmin, adminController.addProd);
// Patch /admin/product/:prodId
router.patch('/product/:prodId', isLoggedIn, isAdmin, adminController.PatchProd);
// Delete /admin/product/:prodId
router.delete('/product/:prodId', isLoggedIn, isAdmin, adminController.DeleteProd);

// Post /admin/:userId
router.patch('/:userId', isLoggedIn, isAdmin, adminController.MakeAdmin);
// Delete /admin/:userId
router.delete('/:userId', isLoggedIn, isAdmin, adminController.DeleteUser);


export default router;
