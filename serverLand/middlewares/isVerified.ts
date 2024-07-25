import { RequestHandler } from "express";

export const isVerified: RequestHandler = async (req, res, next) => {
    if (req.user && req.user.emailVerified) {
        next();
    }
    else {
        res.status(403);
        next(Error('please confirm you email address'));
    }
};
export default isVerified;

