import { model, Schema } from "mongoose";

/**
* @swagger
*   components:
*     schemas: 
*       user:
*         type: object
*         required:
*           - username
*           - email
*           - password
*         properties:
*           username:
*             type: string
*             description: the unique name for each user
*           email:
*             type: string
*           password:
*             type: string
*           isAdmin:
*             type: boolean
*             description: which indicates if the user is an admin or not
*           emailVerified:
*             type: boolean
*             description: a boolean value to indicates if the email is verified
*
*/
export interface IUser {
    _id?: Schema.Types.ObjectId | string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    emailVerified?: boolean;
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
    emailVerified: {
        type: Boolean,
        default: false,
        // select: false
    },
});

export const User = model<IUser>("User", userSchema);
