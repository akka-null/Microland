"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const isValidId = async (req, res, next) => {
    if ((0, mongoose_1.isValidObjectId)(req.params.prodId)) {
        next();
    }
    res.status(400);
    next(Error('Invalid Id'));
};
exports.default = isValidId;
//# sourceMappingURL=isvalidid.js.map