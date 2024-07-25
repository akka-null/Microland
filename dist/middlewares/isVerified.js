"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerified = void 0;
const isVerified = async (req, res, next) => {
    if (req.user && req.user.emailVerified) {
        next();
    }
    else {
        res.status(403);
        next(Error('please confirm you email address'));
    }
};
exports.isVerified = isVerified;
exports.default = exports.isVerified;
//# sourceMappingURL=isVerified.js.map