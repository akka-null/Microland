"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOrder = exports.getOrders = exports.postReview = exports.getProductByCategory = exports.getProductByType = exports.getProductById = exports.getProducts = void 0;
const productModel_1 = require("../models/productModel");
const orderModel_1 = require("../models/orderModel");
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const itemPerPage = +process.env.ITEM_PER_PAGE;
// FIX: * in click info they used the filter by price but the only qst i have is how to set the min and max price in the frontend side
// ex: in the desktop section the filter slider will look like this:  4000---- 15000
//                                      4000 means the loweset price they have for a pc is 4000 and max is 15000
// ex : in the gpu section yuou will have a diffrent slider prices:  2000 ---19000
//                                      the cheapest gpu is 2000 and the most pricy one is 19000 
//  conclusion: - in some way we need to add one more query to get the max and min price same as i did in total, page, pages
//  WARN: * sleep on it
// getting all the products
// TODO: * we need to filter by price over here?
const getProducts = async (req, res, next) => {
    let page = +req.query.page; // ! means trust me bro i know page will never be undefinded
    page >= 1 ? page : 1;
    try {
        const total = await productModel_1.Product.countDocuments();
        const prods = await productModel_1.Product.find().skip((page - 1) * itemPerPage).limit(itemPerPage);
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), prods });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
// getting one product by the id
const getProductById = async (req, res, next) => {
    const { prodId } = req.params;
    try {
        const prod = await productModel_1.Product.findById({ _id: prodId });
        res.json({ prod });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
// getting the products by the category
//  get product by type: Computer, Part, Peripheral, accessory
const getProductByType = async (req, res, next) => {
    const { productType } = req.params;
    let page = +req.query.page; // ! means trust me bro i know page will never be undefinded
    page >= 1 ? page : 1;
    try {
        const total = await productModel_1.Product.countDocuments({ type: productType });
        const prod = await productModel_1.Product.find({ type: productType }).skip((page - 1) * itemPerPage).limit(itemPerPage);
        ;
        res.json({ page, pages: Math.ceil(total / itemPerPage), prod });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductByType = getProductByType;
//  get product by category: Gpu, Desktop, Cpu, etc..
const getProductByCategory = async (req, res, next) => {
    const { productType, productCategory } = req.params;
    let page = +req.query.page; // ! means trust me bro i know page will never be undefinded
    page >= 1 ? page : 1;
    try {
        const count = await productModel_1.Product.countDocuments({ type: productType, category: productCategory });
        const prod = await productModel_1.Product.find({ type: productType, category: productCategory }).skip((page - 1) * itemPerPage).limit(itemPerPage);
        res.json({ page, pages: Math.ceil(count / itemPerPage), prod });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductByCategory = getProductByCategory;
const postReview = async (req, res, next) => {
    const { prodId } = req.params;
    const { name, email, userId, comment, rate } = req.body;
    // checking the validation errors
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const prod = await productModel_1.Product.findById(prodId);
        if (prod) {
            // make sure the user hase only one review and can't add more than one
            const found = prod.reviews.find((element) => element.userId === userId);
            if (found) {
                res.status(400);
                next(Error('User Already reviewd this product'));
            }
            // pushing the new review to the reviews array in product DB
            prod.reviews.push({ name, email, userId, comment, rate: +rate });
            // calculate the new rating
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
// TODO: * need to work on the ORDER
// get all orders
// get pending orders
// update order from pending => delevred
// get orders will be used by the admin so he can see the current pending orders
const getOrders = async (req, res, next) => {
    try {
        const orders = await orderModel_1.Order.find().populate({ path: 'userId', select: '-password -isAdmin -emailConfirmed -_id' });
        res.json({ orders });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrders = getOrders;
// TODO: * need to work on the ORDER
// for now im putting raw data manually will talk about that later
const postOrder = async (req, res, next) => {
    try {
        const order = await orderModel_1.Order.insertMany({
            products: [{
                    product: {
                        name: 'akka',
                        price: 1500,
                    },
                    quantity: 2,
                }],
            totalprice: 3000,
            userId: '6585ffdc004dec4a9df7c509'
        });
        res.status(201).json({ order });
    }
    catch (error) {
        next(error);
    }
};
exports.postOrder = postOrder;
//# sourceMappingURL=shopController.js.map