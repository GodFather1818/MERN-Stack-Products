const express = require("express");
const {
  getProducts,
  createProducts,
  updateProducts,
  deleteProduct,
  specificProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", specificProduct);

router.post("/", createProducts);

router.patch("/:id", updateProducts);

router.delete("/:id", deleteProduct);

module.exports = router;
