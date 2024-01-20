// FIX: * add all the necessary fields to each category
//      * create all the discriminators needed and export them
//      * use typescript here
import { Schema, model } from "mongoose";

export interface IProduct {
    title: string;
    brand: string;
    price: number;
    discountFactor: number;
    discount: number;
    quantity: number;
    description: string;
    image: string | string[];
    condition: 'new' | 'good as new';
    hidden: boolean;
    type: 'Computer' | 'Part' | 'Peripheral';
    category: 'Desktop' | 'Laptop' | 'Tablet' | 'AllInOne' |
    'Mob' | 'Psu' | 'Gpu' | 'Cpu' | 'Ram' | 'Case' |
    'Keyboard' | 'Mouse' | 'Monitor';
}
const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0.0,
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
        default: 0.0,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        enum: ["used", "new"],
        default: "new"
    },
    hidden: Boolean,
    type: {
        type: String,
        enum: ['Computer', 'Part', 'Peripheral'],
        required: true
    },
    category: {
        type: String,
        enum: ['Desktop', 'Laptop', 'Tablet', 'AllInOne',
            'Mob', 'Psu', 'Gpu', 'Cpu', 'Ram', 'Case',
            'Keyboard', 'Mouse', 'Monitor',
        ],
        required: true
    }
    // with strict set to false you can add fields that are not defined in the schema 
    // }, { discriminatorKey: 'category', strict: false }); 
}, { discriminatorKey: 'category', timestamps: true });

productSchema.path('type').validate(function(value) {
    const validComputerCategory = ['Desktop', 'Laptop', 'Tablet', 'AllInOne'];
    const validPartCategory = ['Mob', 'Psu', 'Gpu', 'Cpu', 'Ram', 'Case'];
    const validPeripheralCategory = ['Monitor', 'Mouse', 'Keyboard'];

    // if the type(value) is Computer   ==> category must be validComputerCategory
    // if the type(value) is Part       ==> category must be validPartCategory
    // if the type(value) is Peripheral ==> category must be validPeripheralCategroy
    if (value === 'Computer' && !validComputerCategory.includes(this.category)) {
        return false;
    }
    else if (value === 'Part' && !validPartCategory.includes(this.category)) {
        return false;
    }
    else if (value === 'Peripheral' && !validPeripheralCategory.includes(this.category)) {
        return false;
    }

}, "Type does not match Category");

export const Product =  model<IProduct>("Product", productSchema);

