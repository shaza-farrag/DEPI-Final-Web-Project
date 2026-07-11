const Banner = require("../models/banner.model");
const Product = require("../models/product.model");

const asyncHandler = require("../middlewares/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// Create Banner
const createBanner = asyncHandler(async (req, res) => {
  const { offer, description, products } = req.body;

  if (!products || products.length === 0) {
    throw new ApiError(400, "Please select at least one product");
  }

  const existingProducts = await Product.find({
    _id: { $in: products },
  });

  if (existingProducts.length !== products.length) {
    throw new ApiError(404, "One or more products not found");
  }

  const banner = await Banner.create({
    offer,
    description,
    products,
  });

  return res.status(201).json(
    new ApiResponse(201, banner, "Banner created successfully")
  );
});

// Get All Banners
const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find()
    .populate("products", "name price image stock")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        banners,
        totalBanners: banners.length,
      },
      "Banners fetched successfully"
    )
  );
});

// Get Banner By Id
const getBannerById = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id).populate(
    "products",
    "name price image stock"
  );

  if (!banner) {
    throw new ApiError(404, "Banner not found");
  }

  return res.status(200).json(
    new ApiResponse(200, banner, "Banner fetched successfully")
  );
});

// Update Banner
const updateBanner = asyncHandler(async (req, res) => {
  const { offer, description, products } = req.body;

  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    throw new ApiError(404, "Banner not found");
  }

  if (products) {
    const existingProducts = await Product.find({
      _id: { $in: products },
    });

    if (existingProducts.length !== products.length) {
      throw new ApiError(404, "One or more products not found");
    }

    banner.products = products;
  }

  banner.offer = offer ?? banner.offer;
  banner.description = description ?? banner.description;

  await banner.save();

  return res.status(200).json(
    new ApiResponse(200, banner, "Banner updated successfully")
  );
});

// Delete Banner
const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    throw new ApiError(404, "Banner not found");
  }

  await banner.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, null, "Banner deleted successfully")
  );
});

module.exports = {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
};