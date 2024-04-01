"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveredOrder = exports.getAllOrders = exports.DeleteUser = exports.MakeAdmin = exports.GetUserById = exports.GetUsers = exports.DeleteProd = exports.PatchProd = exports.addProd = void 0;
const productModel_1 = require("../models/productModel");
const userModel_1 = require("../models/userModel");
const orderModel_1 = require("../models/orderModel");
const express_validator_1 = require("express-validator");
const addProd = async (req, res, next) => {
    try {
        const prod = await productModel_1.Product.insertMany(req.body);
        res.status(201).json({ prod });
    }
    catch (error) {
        next(error);
    }
};
exports.addProd = addProd;
const PatchProd = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const { prodId, ...update } = req.body;
        await productModel_1.Product.findByIdAndUpdate(prodId, update);
        res.status(201).json({ "message": "product updated" });
    }
    catch (error) {
        next(error);
    }
};
exports.PatchProd = PatchProd;
const DeleteProd = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const deleted = await productModel_1.Product.findByIdAndDelete(req.params.prodId);
        res.status(200).json({ deleted });
    }
    catch (error) {
        next(error);
    }
};
exports.DeleteProd = DeleteProd;
const GetUsers = async (_req, res, next) => {
    try {
        const users = await userModel_1.User.find().select('-password -__v');
        res.json({ users });
    }
    catch (error) {
        next(error);
    }
};
exports.GetUsers = GetUsers;
const GetUserById = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const user = await userModel_1.User.findById(req.params.userId).select('-password -__v -emailVerified');
        res.json({ user });
    }
    catch (error) {
        next(error);
    }
};
exports.GetUserById = GetUserById;
const MakeAdmin = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const user = await userModel_1.User.findByIdAndUpdate(req.params.userId, { isAdmin: true });
        if (user) {
            return res.status(200).json({ "msg": `${user.username} become admin` });
        }
        res.status(400);
        next(Error("User not Found"));
    }
    catch (error) {
        next(error);
    }
};
exports.MakeAdmin = MakeAdmin;
const DeleteUser = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const deleted = await userModel_1.User.findByIdAndDelete(req.params.userId);
        if (deleted) {
            return res.status(200).json({ "msg": 'user has been deleted' });
        }
        res.status(400);
        next(Error('user does not exist'));
    }
    catch (error) {
        next(error);
    }
};
exports.DeleteUser = DeleteUser;
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel_1.Order.find();
        res.json(orders);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrders = getAllOrders;
const deliveredOrder = async (req, res, next) => {
    const errorResult = (0, express_validator_1.validationResult)(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const order = await orderModel_1.Order.findById(req.params.orderId);
        if (order && order.isDelivered == false) {
            order.isDelivered = true;
            order.deliveredAt = new Date;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }
        else {
            res.status(400);
            next(Error('Order not found or already delivred'));
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deliveredOrder = deliveredOrder;
//# sourceMappingURL=adminController.js.map