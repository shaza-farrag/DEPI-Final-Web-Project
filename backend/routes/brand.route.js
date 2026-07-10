const express = require("express");
const router = express.Router();

const {
  createBrand,
  getBrands,
  getBrand,
  getProductsByBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controller");

router.post("/", createBrand);

router.get("/", getBrands);

router.get("/:id/products", getProductsByBrand);

router.get("/:id", getBrand);

router.patch("/:id", updateBrand);

router.delete("/:id", deleteBrand);

module.exports = router;