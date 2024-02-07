"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProd = exports.PatchProd = exports.addProd = exports.getDashBoard = void 0;
const productModel_1 = require("../models/productModel");
// get /admin/ to get the admin dashbaord
const getDashBoard = async (_req, res, next) => {
    res.status(200).json({ msg: "the dashBoard" });
};
exports.getDashBoard = getDashBoard;
// post /admin/ => adding a product
const addProd = async (req, res, next) => {
    try {
        // const { type, category, images, ...data } = req.body;
        // const prod = await Product.insertMany({ type, category, images ...data });
        const prod = await productModel_1.Product.insertMany(req.body);
        // NOTE: shoudl we add the product or a message ?
        res.status(201).json({ prod });
    }
    catch (error) {
        next(error);
    }
};
exports.addProd = addProd;
// udpate product
const PatchProd = async (req, res, next) => {
    try {
        // NOTE: # should we add validation here ?
        const { prodId, ...update } = req.body;
        await productModel_1.Product.findByIdAndUpdate(prodId, update);
        res.status(201).json({ "msg": "product updated" });
    }
    catch (error) {
        next(error);
    }
};
exports.PatchProd = PatchProd;
// delete product
const DeleteProd = async (req, res, next) => {
    try {
        const deleted = await productModel_1.Product.findByIdAndDelete(req.params.prodId);
        res.status(200).json({ deleted });
    }
    catch (error) {
        next(error);
    }
};
exports.DeleteProd = DeleteProd;
/*
//FIX: * do we need this
// make  user an admin (not sure if we need it or not)
export const MakeAdmin: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { isAdmin: true });
        if (user) {
            res.status(200).json({ "msg": `${user.username} become admin` });
        }
    } catch (error) {
        next(error);
    }
};

//FIX: * do we also need this
// delete a user
export const DeleteUser: RequestHandler = async (req, res, next) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.userId);
        if (deleted) {
            return res.status(200).json({ "msg": `${deleted} has been deleted` });
        }
        res.status(400)
        next(Error('user does not exist'));
    } catch (error) {
        next(error);
    }
};
*/
//# sourceMappingURL=adminController.js.map