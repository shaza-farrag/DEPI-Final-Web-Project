const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const asyncHandler = require("../middlewares/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const addToCart = asyncHandler(async (req, res) => {
  const {
    productId,
    quantity = 1,
  } = req.body;

  if (!productId) {
    throw new ApiError(400, "Product id is required");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.stock === 0) {
    throw new ApiError(400, "Product is out of stock");
  }

  let cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    if (
      cart.items[itemIndex].quantity >= product.stock
    ) {
      throw new ApiError(
        400,
        "No more stock available"
      );
    }

    if (
        cart.items[itemIndex].quantity + quantity >
        product.stock
        ) {
        throw new ApiError(
            400,
            "No more stock available"
        );
        }

    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Product added to cart successfully"
    )
  );
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  }).populate({
    path: "items.product",
    populate: [
      {
        path: "brand",
        select: "name",
      },
      {
        path: "category",
        select: "name",
      },
    ],
  });

  if (!cart) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          items: [],
          total: 0,
        },
        "Cart is empty"
      )
    );
  }

  const total = cart.items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items: cart.items,
        total,
      },
      "Cart fetched successfully"
    )
  );
});

const increaseQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    throw new ApiError(404, "Product not found in cart");
  }

  const product = await Product.findById(productId);

  if (item.quantity >= product.stock) {
    throw new ApiError(
      400,
      "No more stock available"
    );
  }

  item.quantity++;

  await cart.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Quantity increased successfully"
    )
  );
});

const decreaseQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    throw new ApiError(404, "Product not found in cart");
  }

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
  }

  await cart.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Quantity updated successfully"
    )
  );
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Product removed successfully"
    )
  );
});

module.exports = {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
};