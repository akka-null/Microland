import User from './userModel.js'
import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    products: [{
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
    }],
    totalprice: { type: Number, required: true, },
    status: { type: String, enum: ['delevred', 'pending'], default: 'pending', requried: true },
});


export default mongoose.model('Order', orderSchema);
