"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const userModel_1 = require("./userModel");
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: userModel_1.User
    },
    totalprice: { type: Number, required: true, },
    status: { type: String, enum: ['delevred', 'pending'], default: 'pending', requried: true },
    products: [{
            product: { type: Object, required: true },
            quantity: { type: Number, required: true },
        }],
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
//# sourceMappingURL=orderModel.js.map