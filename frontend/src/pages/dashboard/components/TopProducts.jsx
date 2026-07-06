import { mockProducts } from "./DashboardTable/DashboardTable.jsx"


const topProducts = mockProducts.slice(0, 5);

export default function TopProducts() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow w-[50%]">

        <h3 className="text-lg font-semibold text-[#383338]">
          Top Selling Products
        </h3>


      <div className="grid grid-cols-4 text-gray-400 text-sm mb-4">
        <p>Product</p>
        <p>Sold</p>
        <p></p>
        <p>Revenue</p>
      </div>

      {topProducts.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-4 items-center py-3 border-b last:border-none"
        >
          {/* Product */}
          <div className="flex items-center gap-3">

            <p className="font-medium">{item.name}</p>
          </div>

          {/* Sold */}
          <p>{item.sold}</p>

          {/* Progress */}
    <div className="w-20 h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-violet-600 rounded-full"
        style={{ width: `${item.progress}%` }}
      ></div>
    </div>

    <p>{item.revenue}</p>
      
        </div>
      ))}
    </div>
  );
}