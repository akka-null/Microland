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
const typeMatchCategory_1 = __importDefault(require("../middlewares/typeMatchCategory"));
const express_validator_1 = require("express-validator");
const body_parser_1 = __importDefault(require("body-parser"));
router.get("/products", shopController.getProducts);
router.get("/product/:prodId", (0, express_validator_1.param)("prodId").isMongoId().withMessage("invalid ID"), shopController.getProductById);
router.get("/products/:productType", shopController.getProductByType);
router.get("/products/:productType/:productCategory", typeMatchCategory_1.default, shopController.getProductByCategory);
router.get("/top", shopController.topProds);
router.get("/latest", shopController.latestProd);
router.get("/orders/stripe/result", shopController.orderPaymentResult);
router.post("/orders/stripe/fulfill", body_parser_1.default.raw({ type: 'application/json' }), shopController.stripeFulfillOrder);
exports.default = router;
//# sourceMappingURL=shopRoute.js.map