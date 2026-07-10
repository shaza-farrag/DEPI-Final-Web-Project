const Brand = require("../models/brand.model");
const Category = require("../models/category.model");
const Product = require("../models/product.model");

const asyncHandler = require("../middlewares/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const createBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  if (!name?.trim() || !category) {
    throw new ApiError(400, "Name and category are required");
  }

  const categoryDoc = await Category.findById(category);

  if (!categoryDoc) {
    throw new ApiError(404, "Category not found");
  }

  const exists = await Brand.findOne({
    name,
    category,
  });

  if (exists) {
    throw new ApiError(
      400,
      "Brand already exists in this category"
    );
  }

  const brand = await Brand.create({
    name,
    category,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      brand,
      "Brand created successfully"
    )
  );
});

const getBrands = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const totalBrands = await Brand.countDocuments();

  const brands = await Brand.find()
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        brands,
        currentPage: page,
        totalPages: Math.ceil(totalBrands / limit),
        totalBrands,
      },
      "Brands fetched successfully"
    )
  );
});

const getBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id)
    .populate("category", "name");

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      brand,
      "Brand fetched successfully"
    )
  );
});

const getProductsByBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  const products = await Product.find({
    brand: brand._id,
  })
    .populate("category", "name")
    .populate("brand", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        brand: {
          _id: brand._id,
          name: brand.name,
        },
        products,
      },
      "Products fetched successfully"
    )
  );
});

const updateBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  if (name !== undefined && !name.trim()) {
    throw new ApiError(400, "Brand name cannot be empty");
  }

  if (category) {
  const categoryDoc = await Category.findById(category);

  if (!categoryDoc) {
    throw new ApiError(404, "Category not found");
  }
}

const newName = name ? name.trim() : brand.name;
const newCategory = category ? category : brand.category;

const exists = await Brand.findOne({
  name: newName,
  category: newCategory,
  _id: { $ne: brand._id },
});

if (exists) {
  throw new ApiError(
    400,
    "Brand already exists in this category"
  );
}

brand.name = newName;
brand.category = newCategory;

    brand.name = name;
  

  await brand.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      brand,
      "Brand updated successfully"
    )
  );
});

const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  const productsCount = await Product.countDocuments({
    brand: brand._id,
  });

  if (productsCount > 0) {
    throw new ApiError(
      400,
      "Cannot delete brand because it contains products."
    );
  }

  await brand.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Brand deleted successfully"
    )
  );
});

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  getProductsByBrand,
  updateBrand,
  deleteBrand,
};