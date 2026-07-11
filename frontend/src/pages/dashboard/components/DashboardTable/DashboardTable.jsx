import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiFilter, FiX, FiSearch } from "react-icons/fi";
import { Pencil, Trash2 } from "lucide-react";

import {
  getProducts,
  deleteProduct,
} from "../../../../services/product.service";
import { getCategories } from "../../../../services/category.service";

export default function DashboardTable() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const ITEMS_PER_PAGE = 10;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Categories now come from the backend instead of being hardcoded
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const res = await getCategories();
        setCategories(res.data.categories || res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Go back to the first page whenever search/filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, minPrice, maxPrice]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, statusFilter, categoryFilter, minPrice, maxPrice]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts();

      let filtered = [...(res.data.products || [])];

      // Search
      if (searchTerm.trim()) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Status
      if (statusFilter === "Active") {
        filtered = filtered.filter((p) => p.stock > 0);
      }

      if (statusFilter === "Sold Out") {
        filtered = filtered.filter((p) => p.stock === 0);
      }

      // Category
      if (categoryFilter !== "All") {
        filtered = filtered.filter(
          (p) => p.category?.name === categoryFilter
        );
      }

      // Price
      if (minPrice !== "") {
        filtered = filtered.filter((p) => p.price >= Number(minPrice));
      }

      if (maxPrice !== "") {
        filtered = filtered.filter((p) => p.price <= Number(maxPrice));
      }

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

      const paginatedProducts = filtered.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );

      setProducts(paginatedProducts);
      setTotalItems(filtered.length);
      setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    navigate(`/dashboard/products/edit/${product._id}`, {
      state: { product },
    });
  };

  const confirmDelete = async (id) => {
    try {
      await deleteProduct(id);
      await fetchProducts();
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-5 py-6">
        <h1 className="font-semibold text-2xl sm:text-4xl">Products</h1>
        <button
          onClick={() => navigate("/dashboard/products/upload")}
          className="font-medium w-full sm:w-auto px-5 py-2 leading-9 bg-[#D797C6] text-white
         rounded-md cursor-pointer hover:bg-[#B6679F] whitespace-nowrap"
        >
          + Add Product
        </button>
      </div>

      {/* Search + Filter row */}
      <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-between border-b pb-6 border-gray-300">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-5 pr-10 py-3 bg-[#F5F5F5] rounded-lg focus:outline-none focus:border-pink-500"
          />
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center justify-center gap-2 font-medium px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap"
        >
          <FiFilter />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm text-left text-gray-700">
          <thead className="bg-[#F2DCDC]">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-300 hover:bg-pink-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image?.url}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border shrink-0"
                      />

                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">{product.category?.name || "—"}</td>

                  <td className="px-6 py-4 font-semibold">${product.price}</td>

                  <td className="px-6 py-4">{product.stock}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? "Active" : "Sold Out"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        aria-label="Edit product"
                        className="p-2 rounded-md text-[#7a7171] hover:text-[#D797C6] hover:bg-[#F8ECEC]! transition-colors cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product._id)}
                        aria-label="Delete product"
                        className="p-2 rounded-md text-[#7a7171] hover:text-red-500 hover:bg-[#F8ECEC]! transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-gray-300">
        <span className="text-sm text-gray-600 text-center sm:text-left">
          Showing {totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>

          <span className="font-medium">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* Sidebar Filter */}
      {filterOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setFilterOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full sm:w-80 max-w-full bg-white p-6 shadow-xl overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>

              <button onClick={() => setFilterOpen(false)} aria-label="Close filters">
                <FiX size={24} />
              </button>
            </div>

            {/* Status */}
            <div className="mb-5">
              <label className="block mb-2 font-medium">Status</label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border p-3 rounded-lg"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Sold Out">Sold Out</option>
              </select>
            </div>

            {/* Category - now populated from the backend */}
            <div className="mb-5">
              <label className="block mb-2 font-medium">Category</label>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                disabled={categoriesLoading}
                className="w-full border p-3 rounded-lg disabled:opacity-50"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-5">
              <label className="block mb-2 font-medium">Price Range</label>

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />

                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
              </div>
            </div>

            {/* Clear */}
            <button
              onClick={() => {
                setStatusFilter("All");
                setCategoryFilter("All");
                setSearchTerm("");
                setMinPrice("");
                setMaxPrice("");
              }}
              className="w-full py-3 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white border border-gray-200 rounded-xl p-9 w-full max-w-sm shadow-lg text-center!">
            <h2 className="font-semibold text-2xl mb-2">Delete Product</h2>
            <p className="text-gray-500 text-sm mb-5">
              Are you sure to delete this Product?
            </p>
            <div className="flex items-center justify-center gap-6 sm:gap-10 text-center!">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm rounded-md shadow-zinc-400 shadow-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteTarget)}
                className="px-4 py-2 text-sm rounded-md bg-red-500 shadow-zinc-700 shadow-sm hover:bg-red-600 text-white transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}