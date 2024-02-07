import { RequestHandler } from "express";

export const isCostumer: RequestHandler = async (req, res, next) => {
    if (req.user && req.user.isAdmin === false) {
        next();
    }
    else {
        res.status(403);
        next(Error("Admin cannot that"));
        // next(Error("Admin cannot give reviews"));
    }
};
export default isCostumer;
