// NOTE:  /admin
// - $############### (the client needs the data)
// - [ ]  getdashboard (the client needs the data)
// - [ ]  add prod
// - [ ]  delete prod
// - [ ]  update prod  ( discount, qty)

import Product from "../models/productModel.js";

// get /admin/ to get the admin dashbaord
async function getDashBoard(req, res) {
  res.status(200).json({ msg: "hey from controller of admin" });
}
// post /admin/ => adding a product
async function addProd(req, res) {
  try {
    console.time("adding product");
    const { title, price, quantity, image, description } = req.body;
    const product = await Product.insertMany({
      title,
      price,
      quantity,
      image,
      description,
    });
    res.status(201).json({ product });
    console.timeEnd("adding product");
  } catch (error) {
    console.log(error);
  }
}

export default { getDashBoard, addProd };
