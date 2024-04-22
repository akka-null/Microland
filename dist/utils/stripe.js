"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripePay = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
const stripePay = async (req, res, next, order) => {
    try {
        const line_items = order?.items.map(e => {
            return {
                price_data: {
                    currency: process.env.CURRENCY,
                    product_data: {
                        name: e.name,
                        images: [e.image]
                    },
                    unit_amount: e.price * 100,
                },
                quantity: e.qnty
            };
        });
        if (order.shipmentMethod === 'Deliver') {
            line_items.push({
                price_data: {
                    currency: process.env.CURRENCY,
                    product_data: {
                        name: "Shipment Cost",
                    },
                    unit_amount: parseInt(process.env.SHIPMENT_COST) * 100,
                },
                quantity: 1,
            });
        }
        let base_url = (process.env.NODE_ENV === "development") ? "http://" + req.hostname + ":" + process.env.PORT : "https://" + req.hostname;
        const url_success = base_url + "/api/orders/stripe/result/?sucess=true";
        const url_cancel = base_url + "/api/orders/stripe/result/?canceled=true";
        const session = await stripe.checkout.sessions.create({
            client_reference_id: order?._id.toString(),
            line_items,
            mode: 'payment',
            currency: process.env.CURRENCY,
            success_url: url_success,
            cancel_url: url_cancel,
            metadata: {
                order_id: `${order._id}`,
                user: `${req.user?._id}`,
            },
        });
        res.redirect(303, session.url);
    }
    catch (error) {
        next(error);
    }
};
exports.stripePay = stripePay;
//# sourceMappingURL=stripe.js.map