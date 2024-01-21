"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.MakeAdmin = exports.DeleteProd = exports.PatchProd = exports.addProd = exports.getDashBoard = void 0;
const productModel_1 = require("../models/productModel");
const userModel_1 = __importDefault(require("../models/userModel"));
// get /admin/ to get the admin dashbaord
const getDashBoard = async (_req, res) => {
    res.status(200).json({ msg: "the dashBoard" });
};
exports.getDashBoard = getDashBoard;
// post /admin/ => adding a product
const addProd = async (req, res) => {
    try {
        const { type, category, ...data } = req.body;
        const prod = await productModel_1.Product.insertMany({ type, category, ...data });
        res.status(201).json({ prod });
    }
    catch (err) {
        res.status(400).json({ err });
    }
};
exports.addProd = addProd;
// udpate product
const PatchProd = async (req, res) => {
    try {
        const { prodId, ...update } = req.body;
        await productModel_1.Product.findByIdAndUpdate(prodId, update);
        res.status(201).json({ "msg": "product updated" });
    }
    catch (error) {
        res.json({ "error": error });
    }
};
exports.PatchProd = PatchProd;
// delete product
const DeleteProd = async (req, res) => {
    try {
        const deleted = await productModel_1.Product.findByIdAndDelete(req.params.prodId);
        res.status(200).json({ deleted });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.DeleteProd = DeleteProd;
//FIX: * do we need this
// make  user an admin (not sure if we need it or not)
const MakeAdmin = async (req, res) => {
    try {
        const user = await userModel_1.default.findByIdAndUpdate(req.params.userId, { isAdmin: true });
        if (user) {
            res.status(200).json({ "msg": `${user.username} become admin` });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.MakeAdmin = MakeAdmin;
//FIX: * do we also need this
// delete a user
const DeleteUser = async (req, res) => {
    try {
        const deleted = await userModel_1.default.findByIdAndDelete(req.params.userId);
        if (deleted) {
            return res.status(200).json({ "msg": `${deleted} has been deleted` });
        }
        res.status(400).json({ "msg": `user does not exist` });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.DeleteUser = DeleteUser;
//# sourceMappingURL=adminController.js.map