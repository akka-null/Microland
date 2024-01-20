import Express, { Request, NextFunction, Response, RequestHandler } from "express";
import User, { IUser } from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.loginCookie;
    if (!token) {
        return res.status(401).json({ "errorMsg": "login first" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as JwtPayload;

        const user = await User.findById(decoded.userId, '-password');
        if (user) {
            req.user = user;
            next();
        }
    } catch (error) {

        res.clearCookie("loginCookie");
        return res.status(500).json({ error });
    }
}
export default isLoggedIn;
