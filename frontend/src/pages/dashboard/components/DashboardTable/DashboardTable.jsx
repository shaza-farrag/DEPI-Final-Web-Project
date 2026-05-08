import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // ─────────────────────────────────────────────
      // الجزء ده هيتغير لما الباك يخلص
      // ─────────────────────────────────────────────
      const res = await fetch(
        `http://localhost:5000/api/products?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );

      if (!res.ok) {
        throw new Error("API Error");
      }

      const data = await res.json();

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || data.products?.length || 0);

    } catch (error) {
      console.error("Error fetching products:", error);
      
      // هذا الـ Mock هيتحذف نهائيًا لما الباك يشتغل
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedMock = mockProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      
      setProducts(paginatedMock);
      setTotalPages(Math.ceil(mockProducts.length / ITEMS_PER_PAGE));
      setTotalItems(mockProducts.length);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/products/edit/${id}`);
  };

  // ─────────────────────────────────────────────
  // Mock Data → هيتحذف كامل بعد ما الباك يخلص
  // ─────────────────────────────────────────────

  const mockProducts = [
    { _id: "1", name: "Apple MacBook Pro 17\"", price: 2999, stock: 12, category: { name: "Laptops" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "2", name: "Microsoft Surface Pro", price: 1999, stock: 8, category: { name: "Laptops" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "3", name: "Apple Watch Series 8", price: 399, stock: 25, category: { name: "Watches" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "4", name: "Samsung Galaxy S23", price: 899, stock: 30, category: { name: "Phones" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "5", name: "Sony Headphones", price: 299, stock: 45, category: { name: "Accessories" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "6", name: "Dell XPS 15", price: 1899, stock: 7, category: { name: "Laptops" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "7", name: "iPad Pro 12.9\"", price: 1099, stock: 18, category: { name: "Tablets" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "8", name: "Nike Air Max", price: 129, stock: 60, category: { name: "Shoes" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "9", name: "Canon EOS R6", price: 2499, stock: 5, category: { name: "Cameras" }, image: { url: "https://via.placeholder.com/150" } },
    { _id: "10", name: "Samsung 4K TV", price: 799, stock: 14, category: { name: "Electronics" }, image: { url: "https://via.placeholder.com/150" } },
    // أضفت 20 منتج إضافي عشان الـ Pagination يبان ويشتغل
    ...Array.from({ length: 20 }, (_, i) => ({
      _id: String(11 + i),
      name: `Product ${11 + i}`,
      price: 100 + i * 50,
      stock: 10 + i,
      category: { name: i % 2 === 0 ? "Electronics" : "Fashion" },
      image: { url: "https://via.placeholder.com/150" }
    }))
  ];

  return (
    <div className="relative overflow-x-auto bg-white my-5 shadow-md rounded-md border border-gray-200">

      {loading && (
        <div className="p-4 text-center text-gray-500">
          Loading products...
        </div>
      )}

      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-sm bg-[#F2DCDC] border-b border-gray-200">
          <tr>
            <th className="p-5 w-9">
              
            </th>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="bg-white border-b hover:bg-[#F8ECEC]"
            >
              <td className="w-4 p-4">
                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded" />
              </td>

              <th className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                <img
                  src={product.image?.url || product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded border"
                />
                {product.name}
              </th>

              <td className="px-6 py-4">
                {product.category?.name || product.category || "غير مصنف"}
              </td>

              <td className="px-6 py-4 font-semibold">
                ${product.price}
              </td>

              <td className="px-6 py-4 text-center">
                {product.stock || 0}
              </td>

              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="text-pink-600 hover:underline font-medium"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination - هذا الجزء مش هيتغير كتير */}
      <nav className="flex items-center justify-between p-4">
        <span className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-semibold">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold">
            {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}
          </span>{" "}
          of{" "}
          <span className="font-semibold">{totalItems}</span>
        </span>

        <ul className="flex text-sm">
          <li>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 h-8 border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 border border-gray-300 ${
                  currentPage === page
                    ? "bg-pink-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 h-8 border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}