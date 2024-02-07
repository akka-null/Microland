"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = async (_req, res, next) => {
    res.status(404);
    next(Error('Page Not Found'));
};
exports.default = notFound;
//# sourceMappingURL=notFound.js.map