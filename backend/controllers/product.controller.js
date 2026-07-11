const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Brand = require("../models/brand.model");

const asyncHandler = require("../middlewares/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const {
  uploadImage,
  deleteImage,
} = require("../services/cloudinary.service");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    brand,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !stock ||
    !category ||
    !brand
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.file) {
    throw new ApiError(400, "Product image is required");
  }

  const categoryDoc = await Category.findById(category);

  if (!categoryDoc) {
    throw new ApiError(404, "Category not found");
  }

  const brandDoc = await Brand.findById(brand);

  if (!brandDoc) {
    throw new ApiError(404, "Brand not found");
  }

  if (brandDoc.category.toString() !== categoryDoc._id.toString()) {
    throw new ApiError(
      400,
      "The selected brand does not belong to the selected category."
    );
  }

  if (price < 0) {
    throw new ApiError(
      400,
      "Price must be greater than or equal to 0"
    );
  }

  if (stock < 0) {
    throw new ApiError(
      400,
      "Stock must be greater than or equal to 0"
    );
  }

  const uploadedImage = await uploadImage(
    req.file,
    categoryDoc.name,
    brandDoc.name
  );

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    soldCount: 0,

    category: categoryDoc._id,
    brand: brandDoc._id,

    image: {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
    },
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      product,
      "Product created successfully"
    )
  );
});

const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (!page || !limit) {
    const products = await Product.find()
      .populate("category", "name")
      .populate("brand", "name")
      .sort({ createdAt: -1 });

    const productsWithProfit = products.map((product) => ({
      ...product.toObject(),
      profit: product.price * product.soldCount,
    }));

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          products: productsWithProfit,
          totalProducts: products.length,
        },
        "Products fetched successfully"
      )
    );
  }

  const skip = (page - 1) * limit;

  const totalProducts = await Product.countDocuments();

  const products = await Product.find()
    .populate("category", "name")
    .populate("brand", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const productsWithProfit = products.map((product) => ({
    ...product.toObject(),
    profit: product.price * product.soldCount,
  }));

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products: productsWithProfit,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      },
      "Products fetched successfully"
    )
  );
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const brands = await Brand.find({
    category: id,
  }).sort({ name: 1 });

  const result = await Promise.all(
    brands.map(async (brand) => {
      const products = await Product.find({
        category: id,
        brand: brand._id,
      })
        .populate("category", "name")
        .populate("brand", "name")
        .sort({ createdAt: -1 });

      return {
        _id: brand._id,
        name: brand.name,
        products,
      };
    })
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        category: {
          _id: category._id,
          name: category.name,
        },
        brands: result,
      },
      "Category products fetched successfully"
    )
  );
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name")
    .populate("brand", "name");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Product fetched successfully"
    )
  );
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    brand,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (price !== undefined && price < 0) {
    throw new ApiError(
      400,
      "Price must be greater than or equal to 0"
    );
  }

  if (stock !== undefined && stock < 0) {
    throw new ApiError(
      400,
      "Stock must be greater than or equal to 0"
    );
  }

  if (category) {
    const categoryDoc = await Category.findById(category);

    if (!categoryDoc) {
      throw new ApiError(404, "Category not found");
    }

    product.category = categoryDoc._id;
  }

  if (brand) {
    const brandDoc = await Brand.findById(brand);

    if (!brandDoc) {
      throw new ApiError(404, "Brand not found");
    }

    product.brand = brandDoc._id;
  }

  const currentCategory = await Category.findById(product.category);
  const currentBrand = await Brand.findById(product.brand);

  if (
    currentBrand.category.toString() !==
    currentCategory._id.toString()
  ) {
    throw new ApiError(
      400,
      "Brand does not belong to category."
    );
  }

  if (req.file) {
    if (product.image?.publicId) {
      await deleteImage(product.image.publicId);
    }

    const uploadedImage = await uploadImage(
      req.file,
      currentCategory.name,
      currentBrand.name
    );

    product.image = {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
    };
  }

  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.stock = stock ?? product.stock;

  await product.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Product updated successfully"
    )
  );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.image?.publicId) {
    await deleteImage(product.image.publicId);
  }

  await product.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Product deleted successfully"
    )
  );
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};