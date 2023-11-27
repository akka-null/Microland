import mongoose from 'mongoose';
const { Schema } = mongoose;


// TODO: add the more atterbute to your schema 
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    token: {
        type: String,
        // required: true,
    }
});

export default mongoose.model('User', userSchema);


