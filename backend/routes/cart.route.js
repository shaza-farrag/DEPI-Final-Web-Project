const express = require("express");

const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const isUser = require("../middlewares/user.middleware");

const {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = require("../controllers/cart.controller");

router.post(
  "/",
  verifyToken,
  isUser,
  addToCart
);

router.get("/", verifyToken, isUser, getCart);

router.patch(
  "/increase/:productId",
  verifyToken,
  isUser,
  increaseQuantity
);

router.patch(
  "/decrease/:productId",
  verifyToken,
  isUser,
  decreaseQuantity
);

router.delete(
  "/:productId",
  verifyToken,
  isUser,
  removeFromCart
);

module.exports = router;