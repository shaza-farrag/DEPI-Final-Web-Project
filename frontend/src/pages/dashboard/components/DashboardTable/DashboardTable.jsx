import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiFilter, FiX, FiSearch } from "react-icons/fi";

// Mock Data خارج الكمبوننت
const mockProducts = [
  {
    _id: "1",
    name: 'Apple MacBook Pro 17"',
    price: 2999,
    stock: 12,
    category: { name: "Laptops" },
    image: { url: "https://via.placeholder.com/150" },
  },

  ...Array.from({ length: 25 }, (_, i) => ({
    _id: String(2 + i),
    name: `Product ${2 + i}`,
    price: 150 + i * 25,
    stock: i % 6 === 0 ? 0 : 15 + i,
    category: {
      name:
        i % 3 === 0
          ? "Laptops"
          : i % 3 === 1
          ? "Phones"
          : "Fashion",
    },
    image: { url: "https://via.placeholder.com/150" },
  })),
];

export default function DashboardTable() {
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
 const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // رجوع لأول صفحة عند البحث أو الفلترة
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter ,  minPrice, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [  currentPage,
        searchTerm,
        statusFilter,
        categoryFilter,
        minPrice,
        maxPrice]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let filtered = [...mockProducts];

      // Search
      if (searchTerm.trim()) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Status Filter
      if (statusFilter === "Active") {
        filtered = filtered.filter((p) => p.stock > 0);
      }

      if (statusFilter === "Sold Out") {
        filtered = filtered.filter((p) => p.stock === 0);
      }

      // Category Filter
      if (categoryFilter !== "All") {
        filtered = filtered.filter(
          (p) => p.category.name === categoryFilter
        );
      }
      
       // Price Filter
      if (minPrice !== "") {
        filtered = filtered.filter(
          (p) => p.price >= Number(minPrice)
        );
      }

      if (maxPrice !== "") {
        filtered = filtered.filter(
          (p) => p.price <= Number(maxPrice)
        );
      }

      // Pagination
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

      const paginatedProducts = filtered.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );

      setProducts(paginatedProducts);

      setTotalItems(filtered.length);

      setTotalPages(
        Math.ceil(filtered.length / ITEMS_PER_PAGE)
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/products/edit/${id}`);
  };

  return (
    <div className="relative overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200">
      <div className="flex  py-6">
        <h1 className="ml-5 font-semibold text-4xl">Products</h1>
        <button 
        onClick={() => navigate("/dashboard/products/upload")}
        className="font-medium w-35 absolute right-4 py-2 leading-9 bg-[#D797C6] text-white
         rounded-md cursor-pointer hover:bg-[#B6679F]"> 
          + Add Product</button>
      </div>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b pb-6 border-gray-300">

        {/* Search */}
        <div className="relative w-[88%]">
          

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-5 pr-4 py-3 bg-[#F5F5F5] rounded-lg focus:outline-none focus:border-pink-500"
          />
          <FiSearch className="absolute right-4 top-4 text-gray-400" />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 font-medium px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <FiFilter />
          Filter
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-700">

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
                      src={product.image.url}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />

                    <span className="font-medium">
                      {product.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {product.category.name}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ${product.price}
                </td>

                <td className="px-6 py-4">
                  {product.stock}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0
                      ? "Active"
                      : "Sold Out"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="text-pink-600 hover:underline mr-4"
                  >
                    Edit
                  </button>

                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-300">

        <span className="text-sm text-gray-600">
          Showing{" "}
          {(currentPage - 1) * ITEMS_PER_PAGE + 1}
          {" "}to{" "}
          {Math.min(
            currentPage * ITEMS_PER_PAGE,
            totalItems
          )}
          {" "}of {totalItems}
        </span>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
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
            className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                Filters
              </h2>

              <button onClick={() => setFilterOpen(false)}>
                <FiX size={24} />
              </button>
            </div>

            {/* Status */}
            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Sold Out">Sold Out</option>
              </select>
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="All">All Categories</option>
                <option value="Laptops">Laptops</option>
                <option value="Phones">Phones</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
            {/* Price Range */}
            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Price Range
              </label>

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
              }}
              className="w-full py-3 border border-red-300 text-red-500 rounded-lg hover:bg-red-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}