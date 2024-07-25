import { IUser } from "../models/userModel";

declare global {
    namespace Express {
        interface Request {
            user?: IUser | null;
        }
    }
}

export interface Items {
    name: string;
    qnty: number;
    price: number;
    image: string;
    prodId: Schema.Types.ObjectId | string;
}
export { }
