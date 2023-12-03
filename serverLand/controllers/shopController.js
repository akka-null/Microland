import Product from "../models/productModel.js";

// getting all the products
async function getProducts(req, res) {
  try {
    console.time("getting products");
    const prods = await Product.find();
    res.json({ prods });
    console.timeEnd("getting products");
  } catch (error) {
    res.status(500).json({ Erorr: "Something went wrong" });
  }
}

// getting one product by the id
async function getProductById(req, res) {
  try {
    console.time("getting product by id");
    const { prodId } = req.params;
    const prod = await Product.findById({ _id: prodId });
    res.json({ prod });
    console.timeEnd("getting product by id");
  } catch (error) {
    res.status(500).json({ Erorr: "Something went wrong" });
  }
}

export default { getProducts, getProductById };
