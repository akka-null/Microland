import { Product } from "../models/productModel.js";
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';
dotenv.config();
const itemPerPage = process.env.ITEM_PER_PAGE;
// getting all the products
async function getProducts(req, res) {
    try {
        // FIX:
        // const page = +req.query.page || 1; // page <= 0 ==> 500 server side error
        // is this the best way to avoid page <= 0
        const page = +req.query.page > 1 ? +req.query.page : 1;

        const count = await Product.countDocuments();
        const prods = await Product.find().skip((page - 1) * itemPerPage).limit(itemPerPage);
        res.json({ prods, page, pages: Math.ceil(count / itemPerPage) });
        console.timeEnd("getting products");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// getting one product by the id
async function getProductById(req, res) {
    try {
        const { prodId } = req.params;
        console.log(prodId);
        const prod = await Product.findById({ _id: prodId });
        res.json({ prod });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// getting the products by the category

//  get product by type: Computer, Part, Peripheral, accessory
async function getProductByType(req, res) {
    const { productType } = req.params;
    try {
        // FIX:
        // const page = +req.query.page || 1; // page <= 0 ==> 500 server side error
        // is this the best way to avoid page <= 0
        const page = +req.query.page > 1 ? +req.query.page : 1;

        const count = await Product.countDocuments({ type: productType });
        const prod = await Product.find({ type: productType }).skip((page - 1) * itemPerPage).limit(itemPerPage);;

        res.json({ prod, page, pages: Math.ceil(count / itemPerPage) });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

//  get product by category: Gpu, Desktop, Cpu, etc..
async function getProductByCategory(req, res) {
    const { productType, productCategory } = req.params;
    try {
        // FIX:
        // const page = +req.query.page || 1; // page <= 0 ==> 500 server side error
        // is this the best way to avoid page <= 0
        const page = +req.query.page > 1 ? +req.query.page : 1;

        const count = await Product.countDocuments({ type: productType, category: productCategory });
        const prod = await Product.find({ type: productType, category: productCategory }).skip((page - 1) * itemPerPage).limit(itemPerPage);

        res.json({ prod, page, pages: Math.ceil(count / itemPerPage) });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// orders
async function getOrders(req, res) {
    try {
        const userid = '6585ffdc004dec4a9df7c509';
        const orders = await Order.find().populate({ path: 'userId', select: '-password -isAdmin -emailConfirmed -_id' });
        res.json({ orders });
    } catch (error) {
        console.log(error);
    }
};
async function postOrder(req, res) {
    try {
        const order = await Order.insertMany({
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


    } catch (error) {
        console.log(error);
    }

};
export default { getProducts, getProductById, getProductByType, getProductByCategory, getOrders, postOrder };
