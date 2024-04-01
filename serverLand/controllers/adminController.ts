import { RequestHandler } from "express";
import { Product } from "../models/productModel";
import { User } from "../models/userModel";
import { Order } from "../models/orderModel";
import { validationResult } from "express-validator";
import { fail } from "assert";

// Products

// @desc    add product
// @path    POST /api/product
// @access  private/admin
export const addProd: RequestHandler = async (req, res, next) => {
    try {
        const prod = await Product.insertMany(req.body);
        res.status(201).json({ prod });
    } catch (error) {
        next(error);
    }
}

// @desc    update product
// @path    PATCH /api/product
// @access  private/admin
export const PatchProd: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        // NOTE: # should we add validation here ?
        const { prodId, ...update } = req.body;
        await Product.findByIdAndUpdate(prodId, update);
        res.status(201).json({ "message": "product updated" });
    } catch (error) {
        next(error);
    }
};

// @desc    delete product
// @path    DELETE /api/product
// @access  private/admin
export const DeleteProd: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const deleted = await Product.findByIdAndDelete(req.params.prodId);
        res.status(200).json({ deleted });
    } catch (error) {
        next(error);
    }
};


// USERS

// @desc    get all users
// @path    GET /api/users
// @access  private/admin
export const GetUsers: RequestHandler = async (_req, res, next) => {
    try {
        const users = await User.find().select('-password -__v');
        res.json({ users });
    } catch (error) {
        next(error)
    }
}

// @desc    get user by Id
// @path    GET /api/user/:userId
// @access  private/admin
export const GetUserById: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const user = await User.findById(req.params.userId).select('-password -__v -emailVerified');
        res.json({ user });
    } catch (error) {
        next(error)
    }
}

// 
// @desc    update a normal user to admin
// @path    PATCH /api/user/:userId
// @access  private/admin
export const MakeAdmin: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {

        const user = await User.findByIdAndUpdate(req.params.userId, { isAdmin: true });
        if (user) {
            return res.status(200).json({ "msg": `${user.username} become admin` });
        }
        res.status(400);
        next(Error("User not Found"));

    } catch (error) {
        next(error);
    }
};

// @desc    delete user by id
// @path    DELETE /api/user/:userId
// @access  private/admin
export const DeleteUser: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const deleted = await User.findByIdAndDelete(req.params.userId);
        if (deleted) {
            return res.status(200).json({ "msg": 'user has been deleted' });
        }
        res.status(400)
        next(Error('user does not exist'));
    } catch (error) {
        next(error);
    }
};

// Orders

// @desc get all orders
// @path GET /api/orders/
// @access private/admin
export const getAllOrders: RequestHandler = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

// @desc update order to be delivered
// @path GET /api/orders/:orderId/deliver
// @access private/admin
export const deliveredOrder: RequestHandler = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        res.status(400);
        return next(Error(errorResult.array()[0]?.msg));
    }
    try {
        const order = await Order.findById(req.params.orderId);
        if (order && order.isDelivered == false) {
            order.isDelivered = true;
            order.deliveredAt = new Date;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }
        else {
            res.status(400);
            next(Error('Order not found or already delivred'));
        }
    } catch (error) {
        next(error);
    }
}
