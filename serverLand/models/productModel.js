import mongoose, { Schema } from "mongoose";

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
        enum: ["good-condition", "new"],
        default: "new"
    },
    // hidden: Boolean
}, { discriminatorKey: 'productCategory' });

// NOTE: should we make the pcType pcParts peripherals and accessories as category or not
//
// TODO: i will just create some schemas im sure i will use no matter what 
//
// NOTE: fuck how stupid i was hmdoulilah it came to me when i was thinking through this at night
// i just need to put all the comman field of all producs under the product model then i put the category fielad to determin 
// which type of product is it and then using the discriminator we can create each sparated produt like gpu, cpu and stuf
//
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
const Product = mongoose.model('Product', productSchema);
const Desktop = Product.discriminator('Desktop', desktopSchema);

export {
    Product,
    Desktop
}
// export default mongoose.model("Product", productSchema);
