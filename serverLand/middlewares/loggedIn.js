import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function isLoggedIn(req, res, next) {
    const token = req.cookies.loginCookie;
    if (!token) {
        return res.status(401).json({ "errorMsg": "login first" });
    }
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            res.clearCookie("loginCookie");
            return res.status(400).json({ err });
        } else {
            User.findById(decoded.userId)
                .then((user) => {
                    req.user = user;
                    next();
                })
                .catch((err) => {
                    return res.status(500).json({ err });
                });
        }
    });
}
export default isLoggedIn;
