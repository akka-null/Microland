// FIX: * add all the necessary fields to each category
//      * create all the discriminators needed and export them
//      * use typescript here
import { ObjectId, Schema, model } from "mongoose";

export interface IReview {
    username: string;
    email: string;
    _id: string | ObjectId | undefined;
    comment: string;
    rate: number;
}

export interface IProduct {
    title: string;
    brand: string;
    price: number;
    quantity: number;
    description: string;
    reviews: [IReview];
    rating: number;
    reviewsCount: number;
    images: string[];
    condition: 'new' | 'used';
    discount: number;
    discountFactor: number;
    hidden: boolean;
    type: 'Computer' | 'Part' | 'Peripheral';
    category: string;
}

const reviewSchema = new Schema<IReview>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
});

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    description: {
        type: String,
        required: true,
    },
    reviews: {
        type: [reviewSchema],
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviewsCount: {
        type: Number,
        default: 0,
    },
    images: {
        type: [String],
        required: true,
    },
    condition: {
        type: String,
        enum: ["used", "new"],
        default: "new"
    },
    discountFactor: {
        type: Number,
        // min: [-1, '% starts from 0-100'],
        // max: [100, "it's the products is free"],
        // defualt: () => {
        //     return (this.discount !== 0) ? (this.discount * 100) / this.price : 0
        // }
        default: 0
    },
    discount: {
        type: Number,
        /* default: () => {
            return (this.price * this.discountFactor) / 100;
        }, */
        default: 0,
    },
    hidden: Boolean,
    type: {
        type: String,
        enum: ['Computer', 'Part', 'Peripheral'],
        required: true
    },
    category: {
        type: String,
        required: true
    }
    // with strict set to false you can add fields that are not defined in the schema 
    // }, { discriminatorKey: 'category', strict: false }); 
}, { timestamps: true });

productSchema.path('type').validate(function(value) {
    const ComputerCategory = ['Desktop', 'Laptop', 'Tablet', 'AllInOne'];
    const PartCategory = ['Mob', 'Psu', 'Gpu', 'Cpu', 'Ram', 'Case', 'Storage', 'Cooler'];
    const PeripheralCategory = ['Monitor', 'Mouse', 'Keyboard', 'Keyboard-Mouse', 'MousePad', 'Headset-Mic', 'Webcam', 'ThermalPaste'];

    // if the type(value) is Computer   ==> category must be validComputerCategory
    // if the type(value) is Part       ==> category must be validPartCategory
    // if the type(value) is Peripheral ==> category must be validPeripheralCategroy
    if (value === 'Computer' && !ComputerCategory.includes(this.category)) {
        return false;
    }
    else if (value === 'Part' && !PartCategory.includes(this.category)) {
        return false;
    }
    else if (value === 'Peripheral' && !PeripheralCategory.includes(this.category)) {
        return false;
    }

}, "Type does not match Category");


export const Product = model<IProduct>("Product", productSchema);

