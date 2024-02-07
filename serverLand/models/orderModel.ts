import { User } from "./userModel"
import { Schema, model } from 'mongoose'
// TODO: * order model 
// WARN: #NEVER TRUST THE FRONTEND

export interface IOrder {
    userId: Schema.Types.ObjectId | string;
    totalprice: number;
    status: 'Pending' | 'Delivred';
    products: [
        prodId: string
    ];
}
const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    totalprice: { type: Number, required: true, },
    status: { type: String, enum: ['delevred', 'pending'], default: 'pending', requried: true },
    products: [{
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
    }],
});

export const Order = model('Order', orderSchema);
