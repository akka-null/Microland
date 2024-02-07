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
const express_1 = require("express");
const router = (0, express_1.Router)();
const shopController = __importStar(require("../controllers/shopController"));
const iscostumer_1 = __importDefault(require("../middlewares/iscostumer"));
const loggedIn_1 = __importDefault(require("../middlewares/loggedIn"));
const express_validator_1 = require("express-validator");
const isvalidid_1 = __importDefault(require("../middlewares/isvalidid"));
router.get("/products", shopController.getProducts);
router.get("/product/:prodId", shopController.getProductById);
router.get("/products/:productType", shopController.getProductByType);
router.get("/products/:productType/:productCategory", shopController.getProductByCategory);
router.post("/review/:prodId", isvalidid_1.default, (0, express_validator_1.body)("rate").isIn(["1", "2", "3", "4", "5"]).withMessage("1-5 are allowed as rating values"), loggedIn_1.default, iscostumer_1.default, shopController.postReview);
// costumer orders
// create an order
// router.post("/order", shopController.postOrder);
// costumer see all the past orders
// router.get("/orders", shopController.getOrders); 
// admin orders
// see all the pending orders
// see all the orders
exports.default = router;
//# sourceMappingURL=shopRoute.js.map