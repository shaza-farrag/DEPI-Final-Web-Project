import mongoose from "mongoose";
import dotenv from "dotenv";

import Category from "../models/category.model.js";
import Brand from "../models/brand.model.js";
import Product from "../models/product.model.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const products = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "data", "products.json"),
    "utf8"
  )
);

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    //----------------------------------------
    // Delete old data
    //----------------------------------------

    await Product.deleteMany({});
    await Brand.deleteMany({});
    await Category.deleteMany({});

    console.log("Old data deleted");

    //----------------------------------------
    // Insert Categories
    //----------------------------------------

    const uniqueCategories = [...new Set(products.map(p => p.category))];

    const categoryDocs = await Category.insertMany(
      uniqueCategories.map(name => ({
        name
      }))
    );

    console.log(`${categoryDocs.length} Categories Added`);

    //----------------------------------------
    // Insert Brands
    //----------------------------------------

    const brandMap = new Map();

    products.forEach(product => {
      const key = `${product.brand}-${product.category}`;

      if (!brandMap.has(key)) {
        brandMap.set(key, {
          name: product.brand,
          category: product.category
        });
      }
    });

    const brandsToInsert = [];

    for (const brand of brandMap.values()) {

      const category = categoryDocs.find(
        c => c.name === brand.category
      );

      brandsToInsert.push({
        name: brand.name,
        category: category._id
      });
    }

    const brandDocs = await Brand.insertMany(brandsToInsert);

    console.log(`${brandDocs.length} Brands Added`);

    //----------------------------------------
    // Insert Products
    //----------------------------------------

    const productsToInsert = products.map(product => {

      const category = categoryDocs.find(
        c => c.name === product.category
      );

      const brand = brandDocs.find(
        b =>
          b.name === product.brand &&
          b.category.toString() === category._id.toString()
      );

      return {

        name: product.name,

        description: product.description,

        price: product.price,

        stock: product.stock,

        soldCount: product.soldCount,

        category: category._id,

        brand: brand._id,

        image: product.image
      };
    });

    await Product.insertMany(productsToInsert);

    console.log(`${productsToInsert.length} Products Added`);

    console.log("Database Seeded Successfully");

    process.exit();

  } catch (err) {

    console.log(err);

    process.exit(1);

  }
};

seedDatabase();