import { RequestHandler } from "express";
import { Product } from "../models/productModel";
import { matchedData, validationResult } from "express-validator";
import { compare } from "bcryptjs";
import { User } from "../models/userModel";
import { Items, Order } from "../models/orderModel";
import dotenv, { config } from "dotenv";
dotenv.config();
import { stripePay } from "../utils/stripe";
import { chargilyPay } from "../utils/chargily";



// Products

// @desc add a review to a product
// @path POST /api/review/:prodId
// @access /private
export const postReview: RequestHandler = async (req, res, next) => {
    const { comment, rate } = req.body;
    const { username, email, _id } = req.user!; // user is logged in so for sure we know req.user is !undefined

    // checking the validation errors
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const prod = await Product.findById(req.params.prodId);
        if (prod) {
            // make sure the user hase only one review and can't add more than one
            const found = prod.reviews.find(e => e._id == _id);
            if (found) {
                res.status(400);
                return next(Error('User Already reviewd this product'));
            }
            // pushing the new review to the reviews array in product DB
            prod.reviews.push({ username, email, _id, comment, rate: +rate });
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
    } catch (error) {
        next(error);
    }
};

// User

// @desc get user profile
// @path GET /api/user
// @access /private
export const myProfile: RequestHandler = async (req, res) => {
    res.json({
        name: req.user?.username,
        email: req.user?.email,
        verified: req.user?.emailVerified,
        admin: req.user?.isAdmin,
    });
}
// @desc update user profile
// @path PATCH /api/user/
// @access /private
export const udpateMyProfile: RequestHandler = async (req, res, next) => {
    res.send("update my profile");
}

// @desc  delete my account
// @path DELETE /api/user/
// @access /private
export const deleteMe: RequestHandler = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (req.user && await compare(password, req.user.password)) {

            const user = await User.findByIdAndDelete(req.user._id);
            res.clearCookie("loginCookie")
                .json({ msg: `${req.user.username} been deleted` });
        }
        else {
            res.status(400);
            next(Error("password incorrect"));
        }
    } catch (error) {
        next(error)
    }

}

// order

// @desc add order
// @path POST /api/orders
// @access /private
export const addOrder: RequestHandler = async (req, res, next) => {
    const { email, firstName, lastName, phone } = matchedData(req);
    //TODO: validate the shiment info
    const { shippingInfo, shipmentMethod, paymentMethod } = req.body;
    const items: [Items] = req.body.items;
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    // WARN: never trust the prices from the Front End
    try {
        const prods = await Product.find({ _id: { $in: items.map(e => e._id) } });
        const orderItems = items.map(item => {
            const matched = prods.find(prod => item._id.toString() === prod._id.toString());
            return {
                ...item,
                // name: item.name,
                // qnty: item.qnty,
                // image: item.image,
                price: matched?.price,
                _id: item._id
            }
        });
        const shippingPrice = shipmentMethod === 'Deliver' ? parseInt(process.env.SHIPMENT_COST) : 0;
        const itemsPrice = orderItems.reduce(
            (acc, item) => acc + (item.price! * item.qnty), 0
        );
        const totalPrice = itemsPrice + shippingPrice;

        // creating the order and storing it into the DB
        const order = new Order({
            user: req.user?._id,
            firstName,
            lastName,
            phone,
            email,
            items: orderItems,
            shippingInfo,
            shipmentMethod,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    } catch (error) {
        next(error)
    }
}

// @desc get my order
// @path GET /api/orders/mine
// @access /private
export const getOrders: RequestHandler = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user?._id })
        res.json(orders);
    } catch (error) {
        next(error)
    }
}

// @desc get order by id
// @path GET /api/orders/:orderId
// @access /private
export const getOrderById: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const order = await Order.findById(req.params.orderId);
        res.json(order);
    } catch (error) {
        next(error);
    }
}

// @desc user pay order
// @path POST /api/orders/:orderId/
// @access /private
export const payOrder: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            res.status(400)
            return next(Error("order not found"));
        }
        if (order.paymentMethod === "Stripe") {
            stripePay(req, res, next, order);
        }
        else if (order.paymentMethod === "Chargily") {
            chargilyPay(req, res, next, order);
        }
        else {
            // paymentMethod: store, shipmentMethod: Hand (the admin should update the order to be paid in this case)
            res.status(400).json({ paymentMethod: order.paymentMethod, shipmentMethod: order.shipmentMethod, message: "you can't pay it online" });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
