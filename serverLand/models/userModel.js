import mongoose from "mongoose";
const { Schema } = mongoose;

// TODO: add the more atterbute to your schema
const userSchema = new Schema({
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

export default mongoose.model("User", userSchema);
