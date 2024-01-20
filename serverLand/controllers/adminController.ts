import { RequestHandler } from "express";
import { Product } from "../models/productModel";
import User from "../models/userModel";

// get /admin/ to get the admin dashbaord
export const getDashBoard: RequestHandler = async (_req, res) => {
    res.status(200).json({ msg: "the dashBoard" });
}
// post /admin/ => adding a product
export const addProd: RequestHandler = async (req, res) => {
    try {
        const { type, category, ...data } = req.body;
        const prod = await Product.insertMany({ type, category, ...data });
        res.status(201).json({ prod });
    } catch (err) {
        res.status(400).json({ err });
    }
}

// udpate product
export const PatchProd: RequestHandler = async (req, res) => {
    try {
        const { prodId, ...update } = req.body;
        await Product.findByIdAndUpdate(prodId, update);
        res.status(201).json({ "msg": "product updated" });
    } catch (error) {
        res.json({ "error": error });
    }
};
// delete product
export const DeleteProd: RequestHandler = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.prodId);
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).json({ error });
    }
};



//FIX: * do we need this
// make  user an admin (not sure if we need it or not)
export const MakeAdmin: RequestHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { isAdmin: true });
        if (user) {
            res.status(200).json({ "msg": `${user.username} become admin` });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

//FIX: * do we also need this
// delete a user
export const DeleteUser: RequestHandler = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.userId);
        if (deleted) {
            return res.status(200).json({ "msg": `${deleted} has been deleted` });
        }
        res.status(400).json({ "msg": `user does not exist` });
    } catch (error) {
        res.status(500).json({ error });
    }
};
