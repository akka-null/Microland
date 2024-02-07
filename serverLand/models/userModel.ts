import { model, Schema } from "mongoose";

export interface IUser {
    _id?: Schema.Types.ObjectId | string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    emailConfirmed?: boolean;
}

const userSchema = new Schema<IUser>({
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

export const User = model<IUser>("User", userSchema);
