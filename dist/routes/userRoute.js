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
const express_validator_1 = require("express-validator");
const userController = __importStar(require("../controllers/userController"));
const iscostumer_1 = __importDefault(require("../middlewares/iscostumer"));
const loggedIn_1 = __importDefault(require("../middlewares/loggedIn"));
router.route("/user")
    .get(loggedIn_1.default, userController.myProfile)
    .delete(loggedIn_1.default, userController.deleteMe)
    .patch(loggedIn_1.default, userController.udpateMyProfile);
router.post("/review/:prodId", loggedIn_1.default, iscostumer_1.default, (0, express_validator_1.body)("rate").isIn(["1", "2", "3", "4", "5"]).withMessage("1-5 are allowed as rating values"), (0, express_validator_1.param)("prodId").isMongoId().withMessage("invalid ID"), userController.postReview);
router.post("/orders/", loggedIn_1.default, iscostumer_1.default, (0, express_validator_1.body)("email").trim().escape().isEmail().withMessage("Please use a valid E-mail address"), (0, express_validator_1.body)("firstName").trim().escape(), (0, express_validator_1.body)("lastName").trim().escape(), (0, express_validator_1.body)("phone").trim().escape().isMobilePhone('ar-DZ').withMessage('not an algerian number'), userController.addOrder);
router.get("/orders/mine", loggedIn_1.default, iscostumer_1.default, userController.getOrders);
router.route("/orders/:orderId")
    .get(loggedIn_1.default, (0, express_validator_1.param)("orderId").isMongoId().withMessage("invalid ID"), userController.getOrderById)
    .post(loggedIn_1.default, iscostumer_1.default, (0, express_validator_1.param)("orderId").isMongoId().withMessage("invalid ID"), userController.payOrder);
router.use("/orders/:orderId/pay", (0, express_validator_1.param)("orderId").isMongoId().withMessage("invalid ID"), userController.payOrder);
exports.default = router;
//# sourceMappingURL=userRoute.js.map