import { useEffect, useState } from "react";

import { getProducts } from "../../../services/product.service";

export default function TopProducts() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts();
      const products = res.data.products || [];

      // Rank by units sold, take the top 5
      const sorted = [...products]
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 5);

      const maxSold = sorted[0]?.soldCount || 0;

      const withStats = sorted.map((p) => ({
        ...p,
        revenue: (p.price || 0) * (p.soldCount || 0),
        progress: maxSold
          ? Math.round(((p.soldCount || 0) / maxSold) * 100)
          : 0,
      }));

      setTopProducts(withStats);
    } catch (err) {
      console.error("Error fetching top products:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow lg:w-[50%] w-full">
      <h3 className="text-lg font-semibold text-[#383338]">
        Top Selling Products
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 text-gray-400 text-sm mb-4 mt-4 gap-2">
        <p>Product</p>
        <p>Sold</p>
        <p className="hidden sm:block"></p>
        <p className="text-right sm:text-left">Revenue</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-8">Loading...</p>
      ) : topProducts.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No products yet</p>
      ) : (
        topProducts.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-3 sm:grid-cols-4 items-center gap-2 py-3 border-b last:border-none"
          >
            {/* Product */}
            <div className="flex items-center gap-3 min-w-0">
              <p className="font-medium truncate">{item.name}</p>
            </div>

            {/* Sold */}
            <p>{item.soldCount || 0}</p>

            {/* Progress */}
            <div className="hidden sm:block w-20 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-violet-600 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>

            <p className="text-right sm:text-left">
              ${item.revenue.toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}