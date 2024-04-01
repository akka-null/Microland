"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ram = exports.Cpu = exports.Gpu = exports.Tablet = exports.Allinone = exports.Laptop = exports.Desktop = exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
    discountFactor: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
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
}, { discriminatorKey: 'category', timestamps: true });
productSchema.path('type').validate(function (value) {
    const validComputerCategory = ['Desktop', 'Laptop', 'Tablet', 'AllInOne'];
    const validPartCategory = ['Mob', 'Psu', 'Gpu', 'Cpu', 'Ram', 'Case', 'Cooler', 'Storage'];
    const validPeripheralCategory = ['Monitor', 'Mouse', 'Keyboard', 'Keyboard-Mouse', 'MousePad', 'Fan', 'ThermalPaste', 'Headset-Mic'];
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
const desktopSchema = new mongoose_1.Schema({
    mob: String,
    ram: String,
    cpu: String,
    gpu: String,
    psu: String,
    case: String,
    monitor: String,
    storage: String,
});
const laptopSchema = new mongoose_1.Schema({
    ram: String,
    cpu: String,
    gpu: String,
    display: String,
    storage: String,
});
const allinoneSchema = new mongoose_1.Schema({
    display: String,
    ram: String,
    cpu: String,
    gpu: String,
    storage: String,
});
const tabletSchema = new mongoose_1.Schema({
    model: String,
    cpu: String,
    ram: String,
    display: String,
    battry: String,
    storage: String,
});
const mobSchema = new mongoose_1.Schema({
    size: String,
});
const gpuSchema = new mongoose_1.Schema({
    vram: String,
});
const cpuSchema = new mongoose_1.Schema({
    cores: Number,
});
const ramSchema = new mongoose_1.Schema({
    speed: String
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.Product = Product;
const Desktop = Product.discriminator('Desktop', desktopSchema);
exports.Desktop = Desktop;
const Laptop = Product.discriminator('Laptop', laptopSchema);
exports.Laptop = Laptop;
const Allinone = Product.discriminator('AllInOne', allinoneSchema);
exports.Allinone = Allinone;
const Tablet = Product.discriminator('Tablet', tabletSchema);
exports.Tablet = Tablet;
const Gpu = Product.discriminator('Gpu', gpuSchema);
exports.Gpu = Gpu;
const Cpu = Product.discriminator('Cpu', cpuSchema);
exports.Cpu = Cpu;
const Ram = Product.discriminator('Ram', ramSchema);
exports.Ram = Ram;
//# sourceMappingURL=productModel-nerdway.js.map