"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestProd = exports.topProds = exports.getProductByCategory = exports.getProductByType = exports.getProductById = exports.getProducts = void 0;
const productModel_1 = require("../models/productModel");
const dotenv_1 = __importDefault(require("dotenv"));
const express_validator_1 = require("express-validator");
dotenv_1.default.config();
const getProducts = async (req, res, next) => {
    const itemPerPage = req.query.itemPerPage ? +req.query.itemPerPage : process.env.ITEM_PER_PAGE;
    const page = (req.query.page && +req.query.page >= 1) ? +req.query.page : 1;
    try {
        const total = await productModel_1.Product.countDocuments();
        const prods = await productModel_1.Product.find().skip((page - 1) * itemPerPage).limit(itemPerPage);
        if (!prods) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), prods });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const prod = await productModel_1.Product.findById({ _id: req.params.prodId });
        res.json({ prod });
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
        const prod = await productModel_1.Product.find({ type: productType }).skip((page - 1) * itemPerPage).limit(itemPerPage);
        ;
        if (!prod) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), prod });
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
        const prod = await productModel_1.Product.find({ type: productType, category: productCategory }).skip((page - 1) * itemPerPage).limit(itemPerPage);
        if (!prod) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), prod });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductByCategory = getProductByCategory;
const topProds = async (_req, res, next) => {
    try {
        const top = await productModel_1.Product.find().sort({ rating: -1 }).limit(5);
        res.json({ top });
    }
    catch (error) {
        next(error);
    }
};
exports.topProds = topProds;
const latestProd = async (_req, res, next) => {
    try {
        const latest = await productModel_1.Product.find().sort({ createdAt: -1 }).limit(5);
        res.json({ latest });
    }
    catch (error) {
        next(error);
    }
};
exports.latestProd = latestProd;
//# sourceMappingURL=shopController.js.map