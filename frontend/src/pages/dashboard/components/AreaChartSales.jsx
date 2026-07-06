import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 15000 },
  { month: "Feb", revenue: 28000 },
  { month: "Mar", revenue: 42000 },
  { month: "Apr", revenue: 35000 },
  { month: "May", revenue: 58000 },
  { month: "Jun", revenue: 68700 },
  { month: "Jul", revenue: 80000 },
  { month: "Aug", revenue: 72000 },
  { month: "Sep", revenue: 61000 },
  { month: "Oct", revenue: 75000 },
  { month: "Nov", revenue: 63000 },
  { month: "Dec", revenue: 60000 },
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-100 text-white px-4 py-2 rounded-xl shadow-lg text-sm">
        <p className="font-semibold">{label} 2024</p>
        <p>EGP {payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const AreaChartSales = () => (
  <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.07)] shadow-sm p-5 w-[60%]">

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-[18px] font-semibold text-[#383338]">Sales Overview</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1] inline-block"></span>
          <span className="text-sm text-[#7a7171]">Revenue (EGP)</span>
        </div>
      </div>
      <select className="text-sm border border-[rgba(0,0,0,0.1)] rounded-lg px-3 py-1.5 text-[#383338] focus:outline-none cursor-pointer">
        <option>This Month</option>
        <option>Last Month</option>
        <option>This Year</option>
      </select>
    </div>

    {/* Chart */}
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tickFormatter={(v) => `${v / 1000}K`}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          width={45}
        />

        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#6366F1"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorRevenue)"
          dot={false}
          activeDot={{ r: 6, fill: "#6366F1", strokeWidth: 2, stroke: "#fff" }}
          animationBegin={200}
          animationDuration={1300}
        />
      </AreaChart>
    </ResponsiveContainer>

  </div>
);

export default AreaChartSales;