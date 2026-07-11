const express = require("express");
const router = express.Router();

const {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} = require("../controllers/banner.controller");

router.post("/", createBanner);

router.get("/", getBanners);

router.get("/:id", getBannerById);

router.patch("/:id", updateBanner);

router.delete("/:id", deleteBanner);

module.exports = router;