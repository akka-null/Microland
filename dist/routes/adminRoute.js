"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FIX: * make sure all the routes all working (here and in postman)
const express_1 = require("express");
const router = (0, express_1.Router)();
const adminController = __importStar(require("../controllers/adminController"));
const loggedIn_1 = __importDefault(require("../middlewares/loggedIn"));
const isadmin_1 = __importDefault(require("../middlewares/isadmin"));
// get /admin
router.get("/", loggedIn_1.default, isadmin_1.default, adminController.getDashBoard);
// post /admin/product
router.post("/product", loggedIn_1.default, isadmin_1.default, adminController.addProd);
// Patch /admin/product/:prodId
router.patch('/product/:prodId', loggedIn_1.default, isadmin_1.default, adminController.PatchProd);
// Delete /admin/product/:prodId
router.delete('/product/:prodId', loggedIn_1.default, isadmin_1.default, adminController.DeleteProd);
// Post /admin/:userId
router.patch('/:userId', loggedIn_1.default, isadmin_1.default, adminController.MakeAdmin);
// Delete /admin/:userId
router.delete('/:userId', loggedIn_1.default, isadmin_1.default, adminController.DeleteUser);
exports.default = router;
//# sourceMappingURL=adminRoute.js.map