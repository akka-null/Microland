// FIX: * add all the necessary fields to each category
//      * create all the discriminators needed and export them
//      * use typescript here
//      * the nerd way of doing it 
// NOTE: * what i mean by the nerdway of doing it is :
//      - create a general interface for all the products (typescript related)
//      - create a sub interfaces that extends the base products interface (typescript related)
//      - create a base model for all the product
//      - extend the base model with sub models like Computer | Part | Peripheral
//     # example on why we need this 
//     if you want to add a gpu and cpu to the DB
//     both are sub products that extedens the base products model but
//     CPU hase "Cores", "threads", "CashSize",.... property
//     GPU hase "VRAM", .. 
//     so we need to use the discriminator for that to extend the base model
//     WARN: * the use case for this :
//     - if you have a filter option on the website you want all the 12gb vram gpu on the DB or all the i3 cpus on the website
//
//     TODO: # wait for the frontend side to finish and then see if you need to use this
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
    condition: 'new' | 'used';
    hidden: boolean;
    type: 'Computer' | 'Part' | 'Peripheral';
    category: string;
}

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
        required: true
    }
    // with strict set to false you can add fields that are not defined in the schema 
    // }, { discriminatorKey: 'category', strict: false }); 
}, { discriminatorKey: 'category', timestamps: true });

productSchema.path('type').validate(function(value) {
    const validComputerCategory = ['Desktop', 'Laptop', 'Tablet', 'AllInOne'];
    const validPartCategory = ['Mob', 'Psu', 'Gpu', 'Cpu', 'Ram', 'Case', 'Cooler', 'Storage'];
    const validPeripheralCategory = ['Monitor', 'Mouse', 'Keyboard', 'Keyboard-Mouse', 'MousePad', 'Fan', 'ThermalPaste', 'Headset-Mic'];

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

}, "Type does not match Category akka");

// Pc type
const desktopSchema = new Schema({
    mob: String,
    ram: String,
    cpu: String,
    gpu: String,
    psu: String,
    case: String,
    monitor: String,
    storage: String,
});

const laptopSchema = new Schema({
    ram: String,
    cpu: String,
    gpu: String,
    display: String,
    storage: String,
    // we need to add more
});

const allinoneSchema = new Schema({
    display: String,
    ram: String,
    cpu: String,
    gpu: String,
    storage: String,
});

const tabletSchema = new Schema({
    model: String,
    cpu: String,
    ram: String,
    display: String,
    battry: String,
    storage: String,
});

// pc parts 
// mob
const mobSchema = new Schema({
    size: String, // atx micro atx
});
// gpu
const gpuSchema = new Schema({
    vram: String,
});
// cpu
const cpuSchema = new Schema({
    cores: Number,

});
// ram
const ramSchema = new Schema({
    speed: String
});
// case 
// storage 
// cooler

// perepherals
// mouse 
// keyboard
// mousepad
// speaker
// headset
// monitor

const Product = model<IProduct>('Product', productSchema);

const Desktop = Product.discriminator('Desktop', desktopSchema);
const Laptop = Product.discriminator('Laptop', laptopSchema);
const Allinone = Product.discriminator('AllInOne', allinoneSchema);
const Tablet = Product.discriminator('Tablet', tabletSchema);

const Gpu = Product.discriminator('Gpu', gpuSchema);
const Cpu = Product.discriminator('Cpu', cpuSchema);
const Ram = Product.discriminator('Ram', ramSchema);

export {
    Product,
    Desktop,
    Laptop,
    Allinone,
    Tablet,
    Gpu,
    Cpu,
    Ram
}
// export default mongoose.model("Product", productSchema);
