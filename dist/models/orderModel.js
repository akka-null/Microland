"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    items: [{
            name: { type: String, required: true },
            qnty: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Product' }
        }],
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true, default: 'Algeria' },
    },
    shipmentMethod: { type: String, enum: ['Store', 'Deliver'], required: true },
    paymentMethod: { type: String, enum: ['Stripe', 'Chargily', 'Hand'] },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
}, { timestamps: true });
orderSchema.path('shipmentMethod').validate(function (value) {
    if (value === 'Store' && (this.paymentMethod === 'Stripe' || this.paymentMethod === 'Chargily')) {
        return false;
    }
    if (value === 'Deliver' && this.paymentMethod === 'Hand') {
        return false;
    }
}, 'shipmentMethod does not match paymentMethod');
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
//# sourceMappingURL=orderModel.js.map