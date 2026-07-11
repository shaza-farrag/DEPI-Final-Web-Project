const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema(
  {
    totalOrders: {
      type: Number,
      default: 250,
    },

    totalRevenue: {
      type: Number,
      default: 10000,
    },

    totalProductsSold: {
      type: Number,
      default: 500,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Statistics",
  statisticsSchema
);