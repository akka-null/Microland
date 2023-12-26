import { Desktop, Product } from "../models/productModel.js";
import User from "../models/userModel.js";

// get /admin/ to get the admin dashbaord
async function getDashBoard(req, res) {
    res.status(200).json({ msg: "the dashBoard" });
}
// post /admin/ => adding a product
async function addProd(req, res) {
    try {
        console.time("adding product");

        // const { title, price, quantity, image, description, condition } = req.body;
        // const product = await Product.insertMany({
        //     title,
        //     price,
        //     quantity,
        //     image,
        //     description,
        //     condition,
        // });
        // res.status(201).json({ product });
        // const prods = await Product.insertMany(req.body);
        // res.status(201).json({ prods });

        // second aproach
        // const { category, subCategory, ...data } = req.body;
        // console.log(data);
        // console.log(category);
        // console.log(subCategory);
        // res.json({ data, category, subCategory  });

        // thrid apraoch the last one i think 

        const { category, subCategory, ...data } = req.body;
        console.log(category);
        console.log(subCategory);
        console.log(data);
        const prod = await Product.insertMany({ category, subCategory, ...data });
        res.status(201).json({ prod });



        // const prod = new Product(req.body);
        // const product = await prod.save();
        // res.status(201).json({ product });
        // const ff = await Desktop.find();
        // console.log(ff);
        // res.status(201).json({ msg: "hey", ff });
    } catch (err) {
        res.json({ err });
    }
}

// udpate product
async function PatchProd(req, res) {
    try {
        const { title, price, quantity, image, description, condition } = req.body;
        await Product.findByIdAndUpdate(req.params.prodId, {
            title,
            price,
            quantity,
            image,
            description,
            condition,
        });
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
