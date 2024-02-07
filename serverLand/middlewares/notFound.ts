import { RequestHandler } from "express";

const notFound: RequestHandler = async (_req, res, next) => {
    res.status(404);
    next(Error('Page Not Found'));
}
export default notFound;

