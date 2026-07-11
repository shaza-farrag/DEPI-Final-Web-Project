const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingAddress: {
      email: String,
      firstName: String,
      lastName: String,
      country: String,
      city: String,
      address: String,
      apartment: String,
      state: String,
      zip: String,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentIntentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);