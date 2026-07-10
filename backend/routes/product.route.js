const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");

const {
  createProduct,
  getProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);

router.get(
  "/category/:id",
  getProductsByCategory
);

router.get("/:id", getProductById);

router.patch("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;