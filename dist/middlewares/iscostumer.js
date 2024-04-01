"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCostumer = void 0;
const isCostumer = async (req, res, next) => {
    if (req.user && req.user.isAdmin === false) {
        next();
    }
    else {
        res.status(403);
        next(Error("Admin cannot that"));
    }
};
exports.isCostumer = isCostumer;
exports.default = exports.isCostumer;
//# sourceMappingURL=iscostumer.js.map