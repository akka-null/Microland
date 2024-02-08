import { RequestHandler } from "express";
import { User } from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isLoggedIn: RequestHandler = async (req, res, next) => {
    const token = req.cookies.loginCookie;
    if (!token) {
        res.status(401);
        return next(Error('Login First'));
    }
    try {
        // TODO: # avoid using as JwtPayload
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as JwtPayload;
        const user = await User.findById(decoded.userId, '-password');
        if (user) {
            req.user = user;
            next();
        }
    } catch (error) {
        res.clearCookie("loginCookie");
        res.status(500);
        next(error)
    }
}
export default isLoggedIn;
