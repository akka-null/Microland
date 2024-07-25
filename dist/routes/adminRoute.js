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
const adminController = __importStar(require("../controllers/adminController"));
const loggedIn_1 = __importDefault(require("../middlewares/loggedIn"));
const isadmin_1 = __importDefault(require("../middlewares/isadmin"));
const isVerified_1 = require("../middlewares/isVerified");
const express_validator_1 = require("express-validator");
router.route("/product")
    .post(loggedIn_1.default, isadmin_1.default, isVerified_1.isVerified, adminController.addProd)
    .patch(loggedIn_1.default, isVerified_1.isVerified, isadmin_1.default, (0, express_validator_1.body)("prodId").isMongoId().withMessage("invalid ID"), adminController.PatchProd);
router.delete('/product/:prodId', loggedIn_1.default, isVerified_1.isVerified, isadmin_1.default, (0, express_validator_1.param)("prodId").isMongoId().withMessage("invalid ID"), adminController.DeleteProd);
router.get('/users', loggedIn_1.default, isVerified_1.isVerified, isadmin_1.default, adminController.GetUsers);
router.route("/user/:userId")
    .patch(loggedIn_1.default, isadmin_1.default, isVerified_1.isVerified, (0, express_validator_1.param)("userId").isMongoId().withMessage("invalid ID"), adminController.MakeAdmin)
    .delete(loggedIn_1.default, isadmin_1.default, isVerified_1.isVerified, (0, express_validator_1.param)("userId").isMongoId().withMessage("invalid ID"), adminController.DeleteUser);
router.get("/orders/", loggedIn_1.default, isVerified_1.isVerified, isadmin_1.default, adminController.getAllOrders);
router.patch("/orders/:orderId/deliver", loggedIn_1.default, isVerified_1.isVerified, isadmin_1.default, (0, express_validator_1.param)("orderId").isMongoId().withMessage("invalid ID"), adminController.deliveredOrder);
exports.default = router;
//# sourceMappingURL=adminRoute.js.map