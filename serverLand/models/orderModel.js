// import { Product } from './productModel'
import { Schema } from 'mongoose'

const orderSchema = new Schema({
    products: [{
        product: { type: Object, required: true },
        qunatity: { type: Number, required: true },
    }],
    totalprice: { type: Number, required: true, },
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: User
        }
    }
});


export default mongoose.model('Order', orderSchema);
