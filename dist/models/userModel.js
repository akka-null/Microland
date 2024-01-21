"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        // select: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        // select: false
    },
    emailConfirmed: {
        type: Boolean,
        default: false,
        // select: false
    },
});
exports.default = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=userModel.js.map