import { useEffect, useState } from "react";

import { getCategories } from "../../../services/category.service";

export default function RevenueCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueByCategory();
  }, []);

  const fetchRevenueByCategory = async () => {
    try {
      setLoading(true);

      const res = await getCategories(1, 1000);
      const allCategories = res.data.categories || [];

      // Your category controller already computes `profit`
      // (sum of price * soldCount) per category — reuse it here.
      const sorted = [...allCategories].sort(
        (a, b) => (b.profit || 0) - (a.profit || 0)
      );

      const maxProfit = sorted[0]?.profit || 0;

      const withProgress = sorted.map((cat) => ({
        ...cat,
        progress: maxProfit ? Math.round(((cat.profit || 0) / maxProfit) * 100) : 0,
      }));

      setCategories(withProgress);
    } catch (error) {
      console.error("Error fetching revenue by category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md lg:w-[30%] w-full mb-6 lg:mb-0">
      <h3 className="text-[18px] font-semibold text-[#383338] w-fit mb-2">
        Revenue by Category
      </h3>

      {loading ? (
        <p className="text-center text-gray-400 py-8">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No categories yet</p>
      ) : (
        categories.map((item) => (
          <div key={item._id} className="mb-5">
            <div className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span className="text-gray-500">
                EGP {(item.profit || 0).toLocaleString()}
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-[#6366F1] rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}