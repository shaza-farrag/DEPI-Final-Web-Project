import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Completed", value: 878, color: "#22C55E" },
  { name: "Pending", value: 251, color: "#FBBF24" },
  { name: "Cancelled", value: 125, color: "#EF4444" },
];

const totalOrders = data.reduce((sum, item) => sum + item.value, 0);

export default function PieChartOrders() {
  return (
    <>
    <div className="flex bg-white border-2 border-gray-200 rounded-2xl lg:w-[40%] p-4 
       lg:mb-0 mb-6 mx-auto lg:mx-0  shadow-sm  sm:w-[80%] w-[100%] ">
        
    <div className="relative w-full h-[300px] ">
        <h3 className="text-[18px] font-semibold text-[#383338]  w-fit">Orders status</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            stroke="none"
            className="w-[50%] sm:w-full"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>


      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none ">
        <h2 className="text-3xl font-bold">{totalOrders}</h2>
        <p className="text-gray-500 text-sm">Total Orders</p>
      </div>
    </div>

    <div className="space-y-4 pt-12">
  {data.map((item) => (
    <div key={item.name} className="flex items-center gap-3">
      <span
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: item.color }}
      ></span>

      <div className="flex-1">
        <p className="font-medium">{item.name}</p>

        <p className="text-sm text-gray-500">
          {Math.round((item.value / totalOrders) * 100)}% ({item.value})
        </p>
      </div>
    </div>
  ))}
</div>
</div>
    </>
  );
}