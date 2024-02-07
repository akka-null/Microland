"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403);
        next(Error('you must be and admin to do that'));
    }
};
exports.isAdmin = isAdmin;
exports.default = exports.isAdmin;
//# sourceMappingURL=isadmin.js.map