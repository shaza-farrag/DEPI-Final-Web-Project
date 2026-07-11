const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");
const isUser = require("../middlewares/user.middleware");

const {
  createCheckoutSession,
} = require("../controllers/checkout.controller");

router.post(
  "/create-session",
  verifyToken,
  isUser,
  createCheckoutSession
);

module.exports = router;