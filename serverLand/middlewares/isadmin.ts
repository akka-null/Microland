import { RequestHandler } from "express";

export const isAdmin: RequestHandler = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json({ "errorMsg": "you must be an admin to do that " });
        }
    } catch (error) {
        res.json({ error });
    }
};
export default isAdmin;
