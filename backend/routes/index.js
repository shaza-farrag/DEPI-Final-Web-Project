const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const adminRoutes = require("./admin.route");

const categoryRoutes = require("./category.route");
const brandRoutes = require("./brand.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const bannerRoutes = require("./banner.routes");



router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

router.use("/categories", categoryRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);

router.use("/cart", cartRoutes);

router.use("/checkout", checkoutRoutes);

router.use("/banners", bannerRoutes);

module.exports = router;