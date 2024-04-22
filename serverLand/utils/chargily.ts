import { NextFunction, Request, Response } from "express";
import { IOrder } from "../models/orderModel";
import { Document, Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Chargily
import { ChargilyClient } from '@chargily/chargily-pay';

const client = new ChargilyClient({
    api_key: `${process.env.CHARGILY_SKEY}`,
    mode: `${process.env.CHARGILY_MOD}`,
});

export const chargilyPay = async (req: Request, res: Response, next: NextFunction, order: (Document<unknown, {}, IOrder> & IOrder & { _id: Types.ObjectId })) => {
    try {
        let base_url = (process.env.NODE_ENV === "development") ? "http://" + req.hostname + ":" + process.env.PORT : "https://" + req.hostname;
        const url_success = base_url + "/api/orders/chargily/result/success";
        const url_cancel = base_url + "/api/orders/chargily/result/failure";

        // NOTE: - i did not want to bother with creating products and prices in chargily 
        //      just used the createCheckout by providing the total amount to pay
        const checkout = await client.createCheckout({
            amount: order.totalPrice,
            currency: process.env.CURRENCY,
            success_url: url_success,
            failure_url: url_cancel,
            webhook_endpoint: `${base_url}/api/orders/chargily/fulfill`,
            locale: 'en', // Optional, defaults to 'ar', language that will show on the page
            pass_fees_to_customer: true, // i thought it was 50/50 from the costumer and the client
            metadata: {
                order_id: order._id,
                user: req.user?._id,
            },
        });
        res.redirect(checkout.checkout_url);

    } catch (error) {
        next(error);
    }
}
