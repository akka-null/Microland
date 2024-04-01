"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payOrder = exports.getOrderById = exports.getOrders = exports.addOrder = exports.deleteMe = exports.udpateMyProfile = exports.myProfile = exports.postReview = void 0;
const productModel_1 = require("../models/productModel");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = require("bcryptjs");
const userModel_1 = require("../models/userModel");
const orderModel_1 = require("../models/orderModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
const postReview = async (req, res, next) => {
    const { comment, rate } = req.body;
    const { username, email, _id } = req.user;
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const prod = await productModel_1.Product.findById(req.params.prodId);
        if (prod) {
            const found = prod.reviews.find(e => e._id == _id);
            if (found) {
                res.status(400);
                return next(Error('User Already reviewd this product'));
            }
            prod.reviews.push({ username, email, _id, comment, rate: +rate });
            if (prod.rating === 0 && prod.reviewsCount === 0) {
                prod.reviewsCount += 1;
                prod.rating = +rate;
            }
            else {
                let score = prod.rating * prod.reviewsCount;
                score += +rate;
                prod.reviewsCount++;
                prod.rating = score / prod.reviewsCount;
            }
            prod.save();
            res.json({ msg: prod });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.postReview = postReview;
const myProfile = async (req, res) => {
    res.json({
        name: req.user?.username,
        email: req.user?.email,
        verified: req.user?.emailVerified,
    });
};
exports.myProfile = myProfile;
const udpateMyProfile = async (req, res, next) => {
    res.send("update my profile");
};
exports.udpateMyProfile = udpateMyProfile;
const deleteMe = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (req.user && await (0, bcryptjs_1.compare)(password, req.user.password)) {
            const user = await userModel_1.User.findByIdAndDelete(req.user._id);
            res.clearCookie("loginCookie")
                .json({ message: `${user} deleted` });
        }
        else {
            res.status(400);
            next(Error("password incorrect"));
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMe = deleteMe;
const addOrder = async (req, res, next) => {
    const { email, firstName, lastName, phone } = (0, express_validator_1.matchedData)(req);
    const { shippingInfo, shipmentMethod, paymentMethod } = req.body;
    const items = req.body.items;
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const prods = await productModel_1.Product.find({ _id: { $in: items.map(e => e._id) } });
        const orderItems = items.map(item => {
            const matched = prods.find(prod => item._id.toString() === prod._id.toString());
            return {
                ...item,
                price: matched?.price,
                _id: item._id
            };
        });
        const shippingPrice = shipmentMethod === 'Deliver' ? process.env.SHIPMENT_COST : 0;
        const itemsPrice = orderItems.reduce((acc, item) => acc + (item.price * item.qnty), 0);
        const totalPrice = itemsPrice + shippingPrice;
        const order = new orderModel_1.Order({
            user: req.user?._id,
            firstName,
            lastName,
            phone,
            email,
            items: orderItems,
            shippingInfo,
            shipmentMethod,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
    catch (error) {
        next(error);
    }
};
exports.addOrder = addOrder;
const getOrders = async (req, res, next) => {
    try {
        const orders = await orderModel_1.Order.find({ user: req.user?._id });
        res.json(orders);
    }
    catch (error) {
        next(error);
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const order = await orderModel_1.Order.findById(req.params.orderId);
        res.json(order);
    }
    catch (error) {
        next(error);
    }
};
exports.getOrderById = getOrderById;
const payOrder = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const order = await orderModel_1.Order.findById(req.params.orderId);
        if (!order) {
            res.status(400);
            return next(Error("order not found"));
        }
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
                    unit_amount: process.env.SHIPMENT_COST * 100,
                },
                quantity: 1,
            });
        }
        const session = await stripe.checkout.sessions.create({
            client_reference_id: order?._id.toString(),
            line_items,
            mode: 'payment',
            currency: process.env.CURRENCY,
            success_url: 'http://localhost:3030/api/orders/stripe/result/?sucess=true',
            cancel_url: 'http://localhost:3030/api/orders/stripe/result/?canceled=true',
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
exports.payOrder = payOrder;
//# sourceMappingURL=userController.js.map