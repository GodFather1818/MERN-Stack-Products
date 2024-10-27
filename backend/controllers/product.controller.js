const Product = require("../models/product.model");
const { default: mongoose } = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const data = await Product.find({});
    console.log("Products Present in our Database: ", data);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error(`Error While Fetching All Products: ${error.message}`);
  }
};

const createProducts = async (req, res) => {
  const product = req.body;
  const incomingData = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.imageURL,
  } //user will sned this data
  console.log(product);
  if (!product.name || !product.price) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide all the fields!" });
  }

  const newProduct = new Product(incomingData);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error in Create Product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateProducts = async (req, res) => {
  const productId = req.params.id;
  const product = req.body;

  console.log("Incoming Updated Data: ", product);

  if (!mongoose.isValidObjectId(productId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    console.log(updatedProduct);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(`Error in Update Product: ${error.message}`);
    res
      .status(500)
      .json({ success: false, message: "Error In Updating the Products!" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  console.log("ID in the URL is: ", productId);
  if (!mongoose.isValidObjectId(productId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true, data: deletedProduct });
  } catch (error) {
    console.error(`Error While Deleting a PRoduct: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const specificProduct = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.isValidObjectId(productId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const particularProduct = await Product.findById(productId);
    console.log("Particular Product: ", particularProduct);
    res.status(200).json({success: true, data: particularProduct});
  }catch (error) {
    console.error(`Error in Fetching a Specific Product: ${error.message}`);
    res
      .status(500)
      .json({ success: false, message: "Error In Fetching the Product!" });
  }
}

module.exports = { getProducts, createProducts, updateProducts, deleteProduct, specificProduct };
