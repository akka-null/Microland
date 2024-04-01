import { Schema, model } from 'mongoose'

export interface Items {
    name: string;
    qnty: number;
    price: number;
    image: string;
    _id: Schema.Types.ObjectId | string;
}
export interface IOrder {
    user: Schema.Types.ObjectId | string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    items: [Items];
    shippingInfo: {
        address: string;
        city: string;
        postalCode: number;
        country: string;
    };
    shipmentMethod: 'Store' | 'Deliver';
    paymentMethod: string; // need costume validation for the route and pyment method as security  messure
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    status: 'Pending' | 'Delivered';
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
}
const orderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    items: [{
        name: { type: String, required: true },
        qnty: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        _id: { type: Schema.Types.ObjectId, required: true, ref: 'Product' }
    }],
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true, default: 'Algeria' },
    },
    shipmentMethod: { type: String, enum: ['Store', 'Deliver'], required: true },
    paymentMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },

}, { timestamps: true });

export const Order = model<IOrder>('Order', orderSchema);
