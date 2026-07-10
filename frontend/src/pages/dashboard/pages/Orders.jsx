import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip
} from "@mui/material";
import { IoBagHandleOutline } from "react-icons/io5";

function Orders() {
  // بيانات تجريبية - استبدليها بالـ API بتاعك
  const orders = [
    {
      id: 1,
      customer_name: "Ahmed Mostafa",
      quantity: 3,
      total_salary: "1,250 EGP",
      brands: "Nike, Adidas",
    },
    {
      id: 2,
      customer_name: "Sara Ali",
      quantity: 1,
      total_salary: "450 EGP",
      brands: "Puma",
    },
    {
      id: 3,
      customer_name: "Mona Hassan",
      quantity: 5,
      total_salary: "3,100 EGP",
      brands: "Zara, H&M, Nike",
    },
  ];

  return (
    <div className="relative p-6 overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#F8ECEC] flex items-center justify-center">
          <IoBagHandleOutline className="text-2xl text-[#D797C6]" />
        </div>
        <h1 className="text-2xl font-semibold text-zinc-600">
          Orders
        </h1>
      </div>

      <TableContainer 
        component={Paper} 
        className="rounded-md! shadow-md! border border-[rgba(0,0,0,0.1)]"
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow className="bg-[#F8ECEC]!">
              <TableCell className="font-bold! text-[#7a7171]!">Order ID</TableCell>
              <TableCell className="font-bold! text-[#7a7171]!">Customer Name</TableCell>
              <TableCell className="font-bold! text-[#7a7171]!" align="center">Quantity</TableCell>
              <TableCell className="font-bold! text-[#7a7171]!" align="center">Total Salary</TableCell>
              <TableCell className="font-bold! text-[#7a7171]!">Brands</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order.id} 
                className="hover:bg-[#F8ECEC]! transition-all"
              >
                <TableCell className="font-medium! text-gray-500!">
                  #{order.id}
                </TableCell>
                <TableCell className="font-medium!">
                  {order.customer_name}
                </TableCell>
                <TableCell align="center">
                  {order.quantity}
                </TableCell>
                <TableCell align="center" className="font-semibold!">
                  {order.total_salary}
                </TableCell>
                <TableCell>
                  {order.brands.split(", ").map((brand, index) => (
                    <Chip 
                      key={index} 
                      label={brand} 
                      size="small" 
                      className="mr-1! mb-1! bg-[#F8ECEC]! text-[#D797C6]!"
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

export default Orders;