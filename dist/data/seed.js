"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("./products"));
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = require("../models/productModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function seedData() {
    try {
        await productModel_1.Product.insertMany(products_1.default);
    }
    catch (err) {
        console.log(err);
    }
}
async function deleteData() {
    try {
        await productModel_1.Product.deleteMany();
    }
    catch (err) {
        console.log(err);
    }
}
mongoose_1.default.connect(process.env.URI)
    .then(async (_connection) => {
    if (process.argv[2] === '-drop') {
        await deleteData();
        console.log('products delted');
    }
    else {
        await seedData();
        console.log('products seeded');
    }
    process.exit(0);
})
    .catch(err => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map