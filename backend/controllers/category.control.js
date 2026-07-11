const Category = require("../models/category.model");
const Brand = require("../models/brand.model");
const Product = require("../models/product.model");

const asyncHandler = require("../middlewares/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name?.trim()) {
    throw new ApiError(400, "Category name is required");
  }

  const exists = await Category.findOne({
    name: name.trim(),
  });

  if (exists) {
    throw new ApiError(400, "Category already exists");
  }

  const category = await Category.create({
    name: name.trim(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

const getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const totalCategories = await Category.countDocuments();

  const categories = await Category.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const categoriesWithStats = await Promise.all(
    categories.map(async (category) => {
      const brandsCount = await Brand.countDocuments({
        category: category._id,
      });

      const products = await Product.find({
        category: category._id,
      });

      const productsCount = products.length;

      const soldProducts = products.reduce(
        (sum, product) => sum + product.soldCount,
        0
      );

      const profit = products.reduce(
        (sum, product) =>
          sum + product.price * product.soldCount,
        0
      );

      return {
        ...category.toObject(),
        brandsCount,
        productsCount,
        soldProducts,
        profit,
      };
    })
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        categories: categoriesWithStats,
        currentPage: page,
        totalPages: Math.ceil(totalCategories / limit),
        totalCategories,
      },
      "Categories fetched successfully"
    )
  );
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      category,
      "Category fetched successfully"
    )
  );
});

const getBrandsByCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const brands = await Brand.find({
    category: category._id,
  }).sort({ name: 1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      brands,
      "Brands fetched successfully"
    )
  );
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (name !== undefined && !name.trim()) {
    throw new ApiError(400, "Category name cannot be empty");
  }

  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (name) {
    const exists = await Category.findOne({
      name: name.trim(),
      _id: { $ne: category._id },
    });

    if (exists) {
      throw new ApiError(400, "Category already exists");
    }

    category.name = name.trim();
  }

  await category.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      category,
      "Category updated successfully"
    )
  );
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  await category.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Category deleted successfully"
    )
  );
});

const getMenu = asyncHandler(async (req, res) => {
  const menu = await Category.aggregate([
    {
      $lookup: {
        from: "brands",
        localField: "_id",
        foreignField: "category",
        as: "brands",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        brands: {
          $map: {
            input: "$brands",
            as: "brand",
            in: {
              _id: "$$brand._id",
              name: "$$brand.name",
            },
          },
        },
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      menu,
      "Menu fetched successfully"
    )
  );
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  getBrandsByCategory,
  updateCategory,
  deleteCategory,
  getMenu,
};