const Stripe = require("stripe");

const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Statistics = require("../models/statistics.model");

const asyncHandler = require("../middlewares/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = asyncHandler(async (req, res) => {

    const {
    email,
    firstName,
    lastName,
    country,
    address,
    apartment,
    city,
    state,
    zip,
    } = req.body;

  const cart = await Cart.findOne({
    user: req.user._id,
  }).populate({
    path: "items.product",
  });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

 
  const amount = cart.items.reduce(
  (sum, item) =>
    sum +
    item.product.price * item.quantity,
  0
);

const paymentIntent =
  await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),

    currency: "usd",
    automatic_payment_methods: {
        enabled: true,
    },

    metadata: {
      userId: req.user._id.toString(),

      email,

      firstName,

      lastName,

      country,

      address,

      apartment,

      city,

      state,

      zip,
    },
  });
 

  return res.status(200).json(
  new ApiResponse(
    200,
    {
      clientSecret:
        paymentIntent.client_secret,
    },
    "Payment intent created successfully"
  )
);
});

const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(
      `Webhook Error: ${err.message}`
    );
  }

  if (event.type === "payment_intent.succeeded") {

    const paymentIntent = event.data.object;

    const cart = await Cart.findOne({
      user: paymentIntent.metadata.userId,
    }).populate("items.product");

    if (!cart) {
      return res.json({
        received: true,
      });
    }

    const totalPrice = cart.items.reduce(
      (sum, item) =>
        sum +
        item.product.price * item.quantity,
      0
    );

    const totalQuantity = cart.items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

    await Order.create({
      user: paymentIntent.metadata.userId,

      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),

      shippingAddress: {
        email: paymentIntent.metadata.email,

        firstName: paymentIntent.metadata.firstName,

        lastName: paymentIntent.metadata.lastName,

        country: paymentIntent.metadata.country,

        address: paymentIntent.metadata.address,

        apartment: paymentIntent.metadata.apartment,

        city: paymentIntent.metadata.city,

        state: paymentIntent.metadata.state,

        zip: paymentIntent.metadata.zip,
        },

      totalPrice,

      paymentStatus: "paid",

      paymentIntentId:
        paymentIntent.id,
    });

    for (const item of cart.items) {
      item.product.stock -= item.quantity;

      item.product.soldCount +=
        item.quantity;

      await item.product.save();
    }

    const statistics =
      await Statistics.findOne();

    statistics.totalOrders += 1;

    statistics.totalRevenue +=
      totalPrice;

    statistics.totalProductsSold +=
      totalQuantity;

    await statistics.save();

    await Cart.deleteOne({
      _id: cart._id,
    });
  }

  res.json({
    received: true,
  });
};

module.exports = {
  createCheckoutSession,
  stripeWebhook,
};