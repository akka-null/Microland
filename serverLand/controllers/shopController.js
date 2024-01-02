import { Allinone, Desktop, Gpu, Laptop, Product, Tablet } from "../models/productModel.js";
// getting all the products
async function getProducts(req, res) {
    try {
        console.time("getting products");
        const prods = await Product.find();
        res.json(prods);
        console.timeEnd("getting products");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// getting one product by the id
async function getProductById(req, res) {
    try {
        const { prodId } = req.params;
        console.log(prodId);
        const prod = await Product.findById({ _id: prodId });
        res.json({ prod });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// getting the products by the category

//  get product by type: Computer, Part, Peripheral, accessory
async function getProductByType(req, res) {
    const { productType } = req.params;
    try {
        const prod = await Product.find({ type: productType });
        res.json(prod);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

//  get product by category: Gpu, Desktop, Cpu, etc..
async function getProductByCategory(req, res) {
    const { productType, productCategory } = req.params;
    try {
        // FIX: check if this apraoch faster or is it better touse them boath
        // const prod = await Product.find({ category: productCategory });
        const prod = await Product.find({ type: productType, category: productCategory });
        res.json(prod);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// orders
async function postOrder(req, res) {
    const data = {
        products: [],
        totalprice: 3000,
        user: {
            name: 'abdennour',
            email: 'abdennour@gmail.com',
            userId: '6585ffdc004dec4a9df7c509'
        }
    }

};
export default { getProducts, getProductById, getProductByType, getProductByCategory };
