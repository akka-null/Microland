// FIX: - add all the necessary fields to each category
//      - create all the discriminators needed and export them
import mongoose, { Schema } from "mongoose";

// NOTE: if you want to make mongoose model flexible add strict option and set it to false
// {strict: false}
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
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
        enum: ['Desktop', 'Gpu', 'Cpu'],
        required: true
    }
    // with strict set to false you can add fields that are not defined in the schema 
    // }, { discriminatorKey: 'category', strict: false }); 
}, { discriminatorKey: 'category', timestamps: true });
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

const Product = mongoose.model('Product', productSchema);

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
