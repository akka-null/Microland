import { RequestHandler } from "express"
import { isValidObjectId } from "mongoose"

const isValidId: RequestHandler = async (req, res, next) => {
    if (isValidObjectId(req.params.prodId)) {
        next();
    }
    res.status(400);
    next(Error('Invalid Id'));
}
export default isValidId;


