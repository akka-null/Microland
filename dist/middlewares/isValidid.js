"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const isValidId = async (req, res, next) => {
    if ((0, mongoose_1.isValidObjectId)(req.params.id)) {
        next();
    }
    // throw new error 
    // 404
    // invalid id
};
exports.default = isValidId;
//# sourceMappingURL=isValidid.js.map