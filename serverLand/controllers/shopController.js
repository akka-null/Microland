// FIX: look if you can nest discriminator
//      or you should use index for pctype, parts, perephrals, accessory and discriminator for the nested category
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

// getting all the computers
async function getComputerByCategory(req, res) {
    const { category } = req.params;
    try {
        switch (category) {
            case 'Desktop':
                const desktop = await Desktop.find();
                res.json(desktop);
                break;

            case 'Laptop':
                const laptop = await Laptop.find();
                res.json(laptop);
                break;
            case 'AllInOne':
                const allinone = await Allinone.find();
                res.json(allinone);
                break;
            case 'Tablet':
                const tablet = await Tablet.find();
                res.json(tablet);
                break;

            default:
                res.status(400).json({ error: "oops what are you looking for " });
                break;
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });

    }
};

// getting all the parts
async function getpartByName(req, res) {
    const { partName } = req.params;
    try {
        switch (partName) {
            case 'Gpu':
                const gpu = await Gpu.find();
                res.json(gpu);
                break;

            default:
                res.status(400).json({ error: "oops what are you looking for " });
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });

    }
};

export default { getProducts, getComputerByCategory, getpartByName, getProductById };
