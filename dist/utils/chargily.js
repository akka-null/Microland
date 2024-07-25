"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chargilyPay = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const chargily_pay_1 = require("@chargily/chargily-pay");
const client = new chargily_pay_1.ChargilyClient({
    api_key: `${process.env.CHARGILY_SKEY}`,
    mode: `${process.env.CHARGILY_MOD}`,
});
const chargilyPay = async (req, res, next, order) => {
    try {
        let base_url = (process.env.NODE_ENV === "development") ? "http://" + req.hostname + ":" + process.env.PORT : "https://" + req.hostname;
        const url_success = base_url + "/api/orders/chargily/result/success";
        const url_cancel = base_url + "/api/orders/chargily/result/failure";
        const checkout = await client.createCheckout({
            amount: order.totalPrice,
            currency: process.env.CURRENCY,
            success_url: url_success,
            failure_url: url_cancel,
            webhook_endpoint: `${base_url}/api/orders/chargily/fulfill`,
            locale: 'en',
            pass_fees_to_customer: true,
            metadata: {
                order_id: order._id,
                user: req.user?._id,
            },
        });
        res.redirect(checkout.checkout_url);
    }
    catch (error) {
        next(error);
    }
};
exports.chargilyPay = chargilyPay;
//# sourceMappingURL=chargily.js.map