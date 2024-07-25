"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chargilyFulfillOrder = exports.stripeFulfillOrder = exports.chargilyPaymentResult = exports.stripePaymentResult = exports.latestProd = exports.topProds = exports.getProductByCategory = exports.getProductByType = exports.getProductById = exports.search = exports.nav = exports.getProducts = void 0;
const productModel_1 = require("../models/productModel");
const dotenv_1 = __importDefault(require("dotenv"));
const express_validator_1 = require("express-validator");
dotenv_1.default.config();
const stripe_1 = __importDefault(require("stripe"));
const orderModel_1 = require("../models/orderModel");
const crypto_1 = require("crypto");
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
const getProducts = async (req, res, next) => {
    const itemPerPage = req.query.itemPerPage ? +req.query.itemPerPage : process.env.ITEM_PER_PAGE;
    const page = (req.query.page && +req.query.page >= 1) ? +req.query.page : 1;
    try {
        const total = await productModel_1.Product.countDocuments();
        const products = await productModel_1.Product.find().skip((page - 1) * itemPerPage).limit(itemPerPage);
        if (!products) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), products });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const nav = async (req, res, next) => {
    try {
        const result = await productModel_1.Product.find().select('-brand -hidden -title -_id -price -quantity -description -reviewsCount -images -rating -condition -discount -discountFactor -reviews -__v -createdAt -updatedAt');
        res.send(result);
    }
    catch (error) {
        next(error);
    }
};
exports.nav = nav;
const search = async (req, res, next) => {
    const term = req.query.term;
    try {
        const product = await productModel_1.Product.find({ $text: { $search: `${term}` } });
        if (product.length === 0) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ product });
    }
    catch (error) {
        next(error);
    }
};
exports.search = search;
const getProductById = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const product = await productModel_1.Product.findById({ _id: req.params.prodId });
        if (!product) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ product });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const getProductByType = async (req, res, next) => {
    const { productType } = req.params;
    const page = (req.query.page && +req.query.page >= 1) ? +req.query.page : 1;
    const itemPerPage = req.query.itemPerPage ? +req.query.itemPerPage : process.env.ITEM_PER_PAGE;
    try {
        const total = await productModel_1.Product.countDocuments({ type: productType });
        const products = await productModel_1.Product.find({ type: productType }).skip((page - 1) * itemPerPage).limit(itemPerPage);
        ;
        if (!products) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), products });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductByType = getProductByType;
const getProductByCategory = async (req, res, next) => {
    const { productType, productCategory } = req.params;
    const page = (req.query.page && +req.query.page >= 1) ? +req.query.page : 1;
    const itemPerPage = req.query.itemPerPage ? +req.query.itemPerPage : process.env.ITEM_PER_PAGE;
    try {
        const total = await productModel_1.Product.countDocuments({ type: productType, category: productCategory });
        const products = await productModel_1.Product.find({ type: productType, category: productCategory }).skip((page - 1) * itemPerPage).limit(itemPerPage);
        if (!products) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), products });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductByCategory = getProductByCategory;
const topProds = async (_req, res, next) => {
    try {
        const products = await productModel_1.Product.find().sort({ rating: -1 }).limit(5);
        res.json({ products });
    }
    catch (error) {
        next(error);
    }
};
exports.topProds = topProds;
const latestProd = async (_req, res, next) => {
    try {
        const products = await productModel_1.Product.find().sort({ createdAt: -1 }).limit(5);
        res.json({ products });
    }
    catch (error) {
        next(error);
    }
};
exports.latestProd = latestProd;
const stripePaymentResult = async (req, res, next) => {
    if (req.query.sucess) {
        res.status(200)
            .json({ message: "Stripe payment Sucess" });
    }
    else {
        res.status(400)
            .json({ message: "Stripe payment Canceled" });
    }
};
exports.stripePaymentResult = stripePaymentResult;
const chargilyPaymentResult = async (req, res, next) => {
    if (req.params.result === 'success') {
        res.status(200)
            .json({ message: "Chargily payment Success" });
    }
    else {
        res.status(400)
            .json({ message: "Chargily payment Canceled" });
    }
};
exports.chargilyPaymentResult = chargilyPaymentResult;
const stripeFulfillOrder = async (req, res, next) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WHSEC, Math.floor(Date.now()));
        if (event.type === 'checkout.session.completed') {
            const order = await orderModel_1.Order.findById(event.data.object.client_reference_id);
            if (order && !order.isPaid) {
                order.isPaid = true;
                order.paidAt = new Date();
                await order.save();
            }
            else {
                res.status(400);
                next(Error('order not Found'));
            }
        }
        res.status(200).end();
    }
    catch (error) {
        res.status(400);
        next(error);
    }
};
exports.stripeFulfillOrder = stripeFulfillOrder;
const chargilyFulfillOrder = async (req, res, next) => {
    const signature = req.headers['signature'];
    const payload = JSON.stringify(req.body);
    if (!signature)
        return res.status(400).end();
    const calcSig = (0, crypto_1.createHmac)('sha256', process.env.CHARGILY_SKEY)
        .update(payload)
        .digest('hex');
    const event = req.body;
    try {
        const order = await orderModel_1.Order.findById(event.data.metadata.order_id);
        if (order && !order.isPaid) {
            switch (event.type) {
                case 'checkout.paid':
                    order.isPaid = true;
                    order.paidAt = new Date();
                    const updated = await order.save();
                    if (updated)
                        return res.status(200).end();
                    break;
                case 'checkout.failed':
                    res.status(400).end();
                    break;
            }
        }
        res.status(200).end();
    }
    catch (error) {
        next(error);
    }
};
exports.chargilyFulfillOrder = chargilyFulfillOrder;
//# sourceMappingURL=shopController.js.map