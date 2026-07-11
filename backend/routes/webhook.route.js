const express = require("express");

const router = express.Router();

const {
  stripeWebhook,
} = require("../controllers/checkout.controller");

router.post(
  "/stripe",
  express.raw({
    type: "application/json",
  }),
  stripeWebhook
);

module.exports = router;