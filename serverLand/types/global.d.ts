import { IUser } from "../models/userModel";

declare global {
    namespace Express {
        interface Request {
            user?: IUser | null;
            // user?: {
            //     id?: string;
            //     username: string;
            //     email: string;
            //     password: string;
            //     isAdmin?: boolean;
            //     emailConfirmed?: boolean;
            // }
        }
    }
}

// declare global {
//     namespace Mongoose {
//         export interface Document {
//             user?: IUser;
//         }
//     }
// }
// to make the file a module and avoid the TypeScript error
export { }
