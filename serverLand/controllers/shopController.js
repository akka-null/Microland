import { Product } from "../models/productModel.js";
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';
dotenv.config();
const itemPerPage = process.env.ITEM_PER_PAGE;

// FIX: in click info they used the filter by price but the only qst i have is how to set the min and max price in the frontend side
// ex: in the desktop section the filter slider will look like this:  4000---- 15000
//                                      4000 means the loweset price they have for a pc is 4000 and max is 15000
// ex : in the gpu section yuou will have a diffrent slider prices:  2000 ---19000
//                                      the cheapest gpu is 2000 and the most pricy one is 19000 
//  conclusion: - in some way we need to add one more query to get the max and min price same as i did in total, page, pages
//  WARN: sleep on it

// getting all the products
        // TODO: -do we need to filter by price over here?
async function getProducts(req, res) {
    // so we make sure we accept only positive numbers
    const page = +req.query.page > 1 ? +req.query.page : 1;
    try {
        const total = await Product.countDocuments();
        const prods = await Product.find().skip((page - 1) * itemPerPage).limit(itemPerPage);

        res.json({ page, total, pages: Math.ceil(total / itemPerPage), prods });

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

// getting one product by the id
async function getProductById(req, res) {
    const { prodId } = req.params;
    try {
        const prod = await Product.findById({ _id: prodId });

        res.json({ prod });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

// getting the products by the category

//  get product by type: Computer, Part, Peripheral, accessory
async function getProductByType(req, res) {
    const { productType } = req.params;
    // so we make sure we accept only positive numbers
    const page = +req.query.page > 1 ? +req.query.page : 1;
    try {
        const total = await Product.countDocuments({ type: productType });
        const prod = await Product.find({ type: productType }).skip((page - 1) * itemPerPage).limit(itemPerPage);;

        res.json({ page, pages: Math.ceil(total / itemPerPage, prod) });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

//  get product by category: Gpu, Desktop, Cpu, etc..
async function getProductByCategory(req, res) {
    const { productType, productCategory } = req.params;
    // so we make sure we accept only positive numbers
    const page = +req.query.page > 1 ? +req.query.page : 1;
    try {

        const count = await Product.countDocuments({ type: productType, category: productCategory });
        const prod = await Product.find({ type: productType, category: productCategory }).skip((page - 1) * itemPerPage).limit(itemPerPage);

        res.json({ page, pages: Math.ceil(count / itemPerPage), prod });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// TODO: orders
// get all orders
// get pending orders
// update order from pending => delevred
// get orders will be used by the admin so he can see the current pending orders

async function getOrders(req, res) {
    try {
        const orders = await Order.find().populate({ path: 'userId', select: '-password -isAdmin -emailConfirmed -_id' });
        res.json({ orders });
    } catch (error) {
        console.log(error);
    }
};
// TODO: orders
// for now im putting raw data manually will talk about that later
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
