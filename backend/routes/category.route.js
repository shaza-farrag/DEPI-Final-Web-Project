const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategory,
  getBrandsByCategory,
  updateCategory,
  deleteCategory,
  getMenu,
} = require("../controllers/category.control");

router.post("/", createCategory);

router.get("/", getCategories);

router.get("/menu", getMenu);

router.get("/:id/brands", getBrandsByCategory);

router.get("/:id", getCategory);

router.patch("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;