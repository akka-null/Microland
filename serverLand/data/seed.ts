import products from "./products"
import mongoose from "mongoose";
import { Product } from "../models/productModel";
import dotenv from "dotenv";
dotenv.config();

async function seedData() {
    try {
        await Product.insertMany(products);
    } catch (err) {
        console.log(err);
    }
}

async function deleteData() {
    try {
        await Product.deleteMany();
    } catch (err) {
        console.log(err);
    }
}

mongoose.connect(process.env.URI!)
    .then(async (_connection) => {
        if (process.argv[2] === '-drop') {
            await deleteData();
            console.log('products deleted');
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
