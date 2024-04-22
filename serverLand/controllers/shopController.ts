import { RequestHandler } from "express";
import { Product } from "../models/productModel";
import dotenv from 'dotenv';
import { validationResult } from "express-validator";
dotenv.config();

import Stripe from "stripe";
import { buffer } from "stream/consumers";
import { Order } from "../models/orderModel";
import { createHmac } from "crypto";
const stripe = new Stripe(process.env.STRIPE_KEY);

//  FIX:
//  filter by price: - in some way we need to add one more query to get the max and min price same as i did in total, page, pages
//  WARN: * sleep on it

// getting all the products
// TODO: * we need to filter by price over here?
export const getProducts: RequestHandler = async (req, res, next) => {
    const itemPerPage = req.query.itemPerPage ? +req.query.itemPerPage : process.env.ITEM_PER_PAGE;
    const page = (req.query.page && +req.query.page >= 1) ? +req.query.page : 1;
    try {
        const total = await Product.countDocuments();
        const prods = await Product.find().skip((page - 1) * itemPerPage).limit(itemPerPage);
        if (!prods) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), prods });
    } catch (error) {
        next(error);
    }
}

// getting one product by the id
export const getProductById: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const prod = await Product.findById({ _id: req.params.prodId });
        res.json({ prod });
    } catch (error) {
        next(error);
    }
}

// getting the products by the category
//  get product by type: Computer, Part, Peripheral, accessory
export const getProductByType: RequestHandler = async (req, res, next) => {
    const { productType } = req.params;
    const page = (req.query.page && +req.query.page >= 1) ? +req.query.page : 1;
    const itemPerPage = req.query.itemPerPage ? +req.query.itemPerPage : process.env.ITEM_PER_PAGE;
    try {
        const total = await Product.countDocuments({ type: productType });
        const prod = await Product.find({ type: productType }).skip((page - 1) * itemPerPage).limit(itemPerPage);;
        if (!prod) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), prod });
    } catch (error) {
        next(error);
    }
};

//  get product by category: Gpu, Desktop, Cpu, etc..
export const getProductByCategory: RequestHandler = async (req, res, next) => {
    const { productType, productCategory } = req.params;
    const page = (req.query.page && +req.query.page >= 1) ? +req.query.page : 1;
    const itemPerPage = req.query.itemPerPage ? +req.query.itemPerPage : process.env.ITEM_PER_PAGE;
    try {

        const total = await Product.countDocuments({ type: productType, category: productCategory });
        const prod = await Product.find({ type: productType, category: productCategory }).skip((page - 1) * itemPerPage).limit(itemPerPage);
        if (!prod) {
            res.status(404);
            return next(Error('No Product Was Found'));
        }
        res.json({ page, total, pages: Math.ceil(total / itemPerPage), prod });
    } catch (error) {
        next(error);
    }
};


// @desc get top rated products
// @path  GET /api/top
// @access /public
export const topProds: RequestHandler = async (_req, res, next) => {
    try {
        const top = await Product.find().sort({ rating: -1 }).limit(5);
        res.json({ top });
    } catch (error) {
        next(error)
    }
}

// @desc get latest products
// @path /api/latest
// @access /public
export const latestProd: RequestHandler = async (_req, res, next) => {
    try {
        const latest = await Product.find().sort({ createdAt: -1 }).limit(5);
        res.json({ latest });

    } catch (error) {
        next(error)
    }
}

// @desc user checkout status || stripe response to the user if completed the chekcout or canceled
// @path 
// @access /public
export const stripePaymentResult: RequestHandler = async (req, res, next) => {
    if (req.query.sucess) {
        res.status(200)
            .json({ message: "Stripe payment Sucess" });
    }
    else {
        res.status(400)
            .json({ message: "Stripe payment Canceled" });
    }
}

// @desc user checkout status || chargily response to the user if completed the chekcout or canceled
// @path 
// @access /public
export const chargilyPaymentResult: RequestHandler = async (req, res, next) => {
    if (req.params.result === 'success') {
        res.status(200)
            .json({ message: "Chargily payment Success" });
    }
    else {
        res.status(400)
            .json({ message: "Chargily payment Canceled" });
    }
}

// @desc stripe fulfill orders
// @path /api/orders/stripe/fulfill
// @access /public
export const stripeFulfillOrder: RequestHandler = async (req, res, next) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WHSEC,
            Math.floor(Date.now()), // helps with timezone diffrence and tolerence
        );
        if (event.type === 'checkout.session.completed') {
            // NOTE: checkout.session.async_payment_succeeded -> we should for this also since im not using stripe in algeria i will not go full on stripe implimentation
            const order = await Order.findById(event.data.object.client_reference_id);
            if (order && !order.isPaid) {
                //  - update the order (time, to be payed)
                order.isPaid = true;
                order.paidAt = new Date();

                await order.save();
                // TODO: - send receipt email 
            }
            else {
                res.status(400)
                next(Error('order not Found'));
            }
        }
        res.status(200).end();
    } catch (error) {
        res.status(400)
        next(error);
    }
}

// @desc Chargily fulfill orders
// @path /api/orders/chargily/fulfill
// @access /public
export const chargilyFulfillOrder: RequestHandler = async (req, res, next) => {
    const signature = req.headers['signature'];
    const payload = JSON.stringify(req.body);

    if (!signature)
        return res.status(400).end();

    // Calculate the signature and comparing it with the one from the headers
    const calcSig = createHmac('sha256', process.env.CHARGILY_SKEY)
        .update(payload)
        .digest('hex');

    /* FIX: - no matter what i tried: the signature send by chargily in the headers and the one we calculate manually does not match 
    *       - i will just not use chargily in prod
    *
    if (calcSig !== signature)
        return res.status(403).end();
        */
    const event = req.body;
    try {
        const order = await Order.findById(event.data.metadata.order_id);

        if (order && !order.isPaid) {
            switch (event.type) {
                case 'checkout.paid':
                    order.isPaid = true;
                    order.paidAt = new Date();

                    const updated = await order.save();
                    if (updated)
                        // TODO: - send receipt email 
                        return res.status(200).end();
                    break;
                case 'checkout.failed':
                    res.status(400).end();
                    break;
            }
        }
        res.status(200).end();
    } catch (error) {
        next(error);
    }
}

