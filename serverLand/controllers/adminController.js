import { Desktop, Product } from "../models/productModel.js";
import User from "../models/userModel.js";

// get /admin/ to get the admin dashbaord
async function getDashBoard(req, res) {
    res.status(200).json({ msg: "the dashBoard" });
}
// post /admin/ => adding a product
async function addProd(req, res) {
    try {
        const { type, category, ...data } = req.body;
        console.log(type);
        console.log(category);
        console.log(data);
        // TODO: check for mongoose error and then procced
        const prod = await Product.insertMany({ type, category, ...data });
        res.status(201).json({ prod });

    } catch (err) {
        res.status(400).json({ err });
    }
}

// udpate product
async function PatchProd(req, res) {
    try {
        const { prodId, ...update } = req.body;
        await Product.findByIdAndUpdate(prodId, update);
        res.status(201).json({ "msg": "product updated" });
    } catch (error) {
        res.json({ "error": error });
    }
};
// delete product
async function DeleteProd(req, res) {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.prodId);
        res.status(200).json({ deleted });
    } catch (error) {
        res.status(500).json({ error });
    }
};


// FIX: think twice if you want to add this to your app

// make  user an admin (not sure if we need it or not)
async function MakeAdmin(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { isAdmin: true });
        res.status(200).json({ "msg": `${user.username} become admin` });
    } catch (error) {
        res.status(500).json({ error });
    }
};
// FIX: think twice if you want to add this to your app

// delete a user
async function DeleteUser(req, res) {
    try {
        const deleted = await User.findByIdAndDelete(req.params.userId);
        if (!deleted) {
            res.status(400).json({ "msg": `user does not exist` });
        }
        res.status(200).json({ "msg": `${deleted.username} has been deleted` });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { getDashBoard, addProd, PatchProd, DeleteProd, MakeAdmin, DeleteUser };
