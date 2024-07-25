import { NextFunction, Request, Response } from "express";
// import { IOrder, Items, Order } from "../models/orderModel";
import { IOrder } from "../models/orderModel";
import { Document, Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

export const stripePay = async (req: Request, res: Response, next: NextFunction, order: (Document<unknown, {}, IOrder> & IOrder & { _id: Types.ObjectId })) => {

    try {
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] | undefined = order?.items.map(e => {
            return {
                price_data: {
                    currency: process.env.CURRENCY,
                    product_data: {
                        name: e.name,
                        images: [e.image]
                    },
                    unit_amount: e.price * 100,
                },
                quantity: e.qnty
            }
        });

        // adding shipment cost to total
        if (order.shipmentMethod === 'Deliver') {
            line_items.push({
                price_data: {
                    currency: process.env.CURRENCY,
                    product_data: {
                        name: "Shipment Cost",
                    },
                    unit_amount: parseInt(process.env.SHIPMENT_COST) * 100,
                },
                quantity: 1,
            });
        }

        //creatring the base url
        let base_url = (process.env.NODE_ENV === "development") ? "http://" + req.hostname + ":" + process.env.PORT : "https://" + req.hostname;
        const url_success = base_url + "/api/orders/stripe/result/?sucess=true";
        const url_cancel = base_url + "/api/orders/stripe/result/?canceled=true";

        // TODO: - take a look at stripe invoice
        const session = await stripe.checkout.sessions.create({
            client_reference_id: order?._id.toString(),
            line_items,
            mode: 'payment',
            currency: process.env.CURRENCY,
            success_url: url_success,
            cancel_url: url_cancel,
            metadata: {
                order_id: `${order._id}`,
                user: `${req.user?._id}`,
            },
        });
        res.redirect(303, session.url!);
    } catch (error) {
        next(error);
    }
}
