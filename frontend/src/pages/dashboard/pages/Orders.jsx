import { IoBagHandleOutline } from "react-icons/io5";

function Orders() {
  const orders = [];

  return (
    <div className="relative p-6 overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#F8ECEC] flex items-center justify-center">
          <IoBagHandleOutline className="text-2xl text-[#D797C6]" />
        </div>
        <h1 className="text-2xl font-semibold text-zinc-600">Orders</h1>
      </div>

      <div className="rounded-md! shadow-md! border border-[rgba(0,0,0,0.1)] overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse">
          <thead>
            <tr className="bg-[#F8ECEC]!">
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Order ID
              </th>
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Customer Name
              </th>
              <th className="font-bold! text-[#7a7171]! text-center px-4 py-3">
                Quantity
              </th>
              <th className="font-bold! text-[#7a7171]! text-center px-4 py-3">
                Total Salary
              </th>
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Brands
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#F8ECEC]! transition-all border-b border-[rgba(0,0,0,0.06)]"
              >
                <td className="font-medium! text-gray-500! px-4 py-3">
                  #{order.id}
                </td>
                <td className="font-medium! px-4 py-3">
                  {order.customer_name}
                </td>
                <td className="text-center px-4 py-3">{order.quantity}</td>
                <td className="font-semibold! text-center px-4 py-3">
                  {order.total_salary}
                </td>
                <td className="px-4 py-3">
                  {order.brands
                    .split(", ")
                    .filter(Boolean)
                    .map((brand, index) => (
                      <span
                        key={index}
                        className="inline-block mr-1! mb-1! px-2.5 py-1 rounded-full text-xs bg-[#F8ECEC]! text-[#D797C6]!"
                      >
                        {brand}
                      </span>
                    ))}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                 No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;