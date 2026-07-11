import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { RiSave3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

import { createProduct } from "../../../services/product.service";
import {
  getCategories,
  getBrandsByCategory,
} from "../../../services/category.service";

export default function ProductsAdd() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Categories/brands now come from the backend instead of being hardcoded
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Load categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const res = await getCategories(1, 1000);
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Load brands whenever the selected category changes
  useEffect(() => {
    if (!formData.category) {
      setBrands([]);
      return;
    }

    const fetchBrands = async () => {
      try {
        setBrandsLoading(true);
        const res = await getBrandsByCategory(formData.category);
        setBrands(res.data || []);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setBrands([]);
      } finally {
        setBrandsLoading(false);
      }
    };

    fetchBrands();
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // reset the brand whenever the category changes, since the old
      // brand may not belong to the newly selected category
      ...(name === "category" ? { brand: "" } : {}),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "اسم المنتج مطلوب";
    if (!formData.sku.trim()) newErrors.sku = "الـ SKU مطلوب";
    if (!formData.category) newErrors.category = "اختار الفئة";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "السعر مطلوب ولازم يكون أكبر من صفر";
    if (formData.stock === "" || Number(formData.stock) < 0)
      newErrors.stock = "الكمية مطلوبة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    try {
      setSubmitting(true);

      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("sku", formData.sku.trim());
      payload.append("category", formData.category);
      if (formData.brand) payload.append("brand", formData.brand);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("stock", formData.stock);
      if (formData.image) payload.append("image", formData.image);

      await createProduct(payload);

      navigate("/dashboard/products");
    } catch (err) {
      console.error("Error creating product:", err);
      setSubmitError(
        err?.response?.data?.message || "Something went wrong while saving the product."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      sku: "",
      category: "",
      brand: "",
      description: "",
      price: "",
      stock: "",
      image: null,
    });
    setImagePreview(null);
    setErrors({});
    setSubmitError("");
  };

  return (
    <>
      <h1 className="text-2xl sm:text-4xl font-semibold leading-tight sm:leading-15 pb-2 pl-2 text-zinc-600">
        Add New Product
      </h1>
      <p className="text-[16px] pb-7 text-zinc-400 pl-2">
        Create a new product and add it to your inventory.
      </p>

      {submitError && (
        <div className="mb-5 mx-2 px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Product Information */}
          <div className="w-full lg:w-[65%] bg-white p-5 border-gray-200 border-2 rounded-2xl h-fit">
            <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Product Information</h3>

            <label className="block">
              <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Product Name *</h4>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1"
              />
              {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              <div>
                <span className="text-zinc-500 text-[16px] font-semibold block mb-2">SKU *</span>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g./PRD-2024-001"
                  className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1"
                />
                {errors.sku && <p className="text-red-500 text-sm">{errors.sku}</p>}
              </div>

              <div>
                <span className="text-zinc-500 text-[16px] font-semibold block mb-2">Category *</span>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={categoriesLoading}
                  className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1 disabled:opacity-50"
                >
                  <option value="">
                    {categoriesLoading ? "Loading categories..." : "Select category"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>
            </div>

            <label className="block">
              <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Description</h4>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="bg-[#F5F5F5] p-2 w-full h-30 rounded-lg focus:outline-gray-200 mb-3"
              />
            </label>
          </div>

          {/* Image + Actions */}
          <div className="w-full lg:w-[35%]">
            <div className="w-full bg-white p-5 h-fit border-gray-200 border-2 rounded-2xl mb-5">
              <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Product Image</h3>
              <div className="border-dashed border-2 border-gray-200 items-center p-5 rounded-xl text-center">
                <label className="cursor-pointer">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="mx-auto mb-3 max-h-32 rounded-lg object-cover"
                    />
                  ) : (
                    <FiUpload className="items-center mx-auto text-5xl text-gray-400 mb-3" />
                  )}

                  <span className="text-gray-600 font-medium">
                    {imagePreview ? "Change image" : "Drop your image here"}
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                <p className="text-sm text-gray-400 mt-2">
                  Supports: JPG, PNG, GIF (Max 5MB)
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-5 h-fit border-gray-200 border-2 rounded-2xl">
              <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Action</h3>
              <button
                type="submit"
                disabled={submitting}
                className="flex justify-center items-center w-full bg-[#D797C6] h-9 text-white font-semibold hover:bg-[#B6679F] mb-3 rounded-md disabled:opacity-60 cursor-pointer"
              >
                <RiSave3Line className="inline pr-2 text-[26px]" />
                {submitting ? "Saving..." : "Save Product"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={submitting}
                className="flex justify-center items-center w-full bg-white border border-[#D797C6] h-9 text-zinc-500 font-semibold hover:border-[#B6679F] hover:border-2 rounded-md disabled:opacity-60 cursor-pointer"
              >
                <RxCross2 className="inline pr-2 text-[26px]" />
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="w-full lg:w-[65%] bg-white p-5 border-gray-200 border-2 rounded-2xl h-fit mt-5">
          <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Pricing & Inventory</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            <div>
              <span className="text-zinc-500 text-[16px] font-semibold block mb-2">Price *</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="$ 0.00"
                min="0"
                step="0.01"
                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            <div>
              <span className="text-zinc-500 text-[16px] font-semibold block mb-2">Stock Quantity *</span>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1"
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-500 text-[16px] font-semibold block mb-2">Brand</span>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                disabled={!formData.category || brandsLoading}
                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-3 disabled:opacity-50"
              >
                <option value="">
                  {!formData.category
                    ? "Select a category first"
                    : brandsLoading
                    ? "Loading brands..."
                    : brands.length === 0
                    ? "No brands for this category"
                    : "Select brand"}
                </option>
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}