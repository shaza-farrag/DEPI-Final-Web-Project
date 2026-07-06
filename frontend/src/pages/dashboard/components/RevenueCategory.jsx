
const categories = [
  { name: "Electronics", revenue: "EGP 120,000", progress: 90 },
  { name: "Fashion", revenue: "EGP 85,000", progress: 70 },
  { name: "Home & Kitchen", revenue: "EGP 60,000", progress: 55 },
  { name: "Beauty", revenue: "EGP 30,000", progress: 30 },
  { name: "Sports", revenue: "EGP 20,000", progress: 20 },
];


export default function RevenueCategory (){
    return (
        <>
<div className="bg-white p-6 rounded-xl shadow-md w-[30%]">
  <h3 className="text-[18px] font-semibold text-[#383338]  w-fit mb-2">
    Revenue by Category
  </h3>

  {categories.map((item) => (
    <div key={item.name} className="mb-5">
      <div className="flex justify-between mb-2">
        <span>{item.name}</span>
        <span className="text-gray-500">{item.revenue}</span>
      </div>

<div className="w-full h-2 bg-gray-200 rounded-full">
  <div
    className="h-2 bg-[#6366F1] rounded-full"
    style={{ width: `${item.progress}%` }}
  ></div>
</div>
    </div>
  ))}
</div>
        </>
    );
}