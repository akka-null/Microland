"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
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
        default: 0
    },
    discount: {
        type: Number,
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
}, { timestamps: true });
productSchema.path('type').validate(function (value) {
    const ComputerCategory = ['Desktop', 'Laptop', 'Tablet', 'AllInOne'];
    const PartCategory = ['Mob', 'Psu', 'Gpu', 'Cpu', 'Ram', 'Case', 'Storage', 'Cooler'];
    const PeripheralCategory = ['Monitor', 'Mouse', 'Keyboard', 'Keyboard-Mouse', 'MousePad', 'Headset-Mic', 'Webcam', 'ThermalPaste'];
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
exports.Product = (0, mongoose_1.model)("Product", productSchema);
//# sourceMappingURL=productModel.js.map