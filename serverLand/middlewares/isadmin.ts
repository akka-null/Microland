import { RequestHandler } from "express";

export const isAdmin: RequestHandler = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403);
        next(Error('you must be and admin to do that'));
    }
};
export default isAdmin;
