"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json({ "errorMsg": "you must be an admin to do that " });
        }
    }
    catch (error) {
        res.json({ error });
    }
};
exports.isAdmin = isAdmin;
exports.default = exports.isAdmin;
//# sourceMappingURL=isadmin.js.map