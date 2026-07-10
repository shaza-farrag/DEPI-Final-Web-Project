import { AreaChart } from "recharts";
import DashboardBoxes from "../components/DashboardBoxes/DashboardBoxes";
import DashboardTable from "../components/DashboardTable/DashboardTable";
import AreaChartSales from "../components/AreaChartSales";
import PieChartOrders from "../components/PieChartOrders";
import RevenueCategory from "../components/RevenueCategory";
import TopProducts from "../components/TopProducts";



function Content (){
    return(
        <>
        <DashboardBoxes />

        <div className="flex gap-8 mb-8">
        <AreaChartSales/>
        <PieChartOrders/>
        </div>
        <div className="flex gap-8 ">
        <RevenueCategory/>
        <TopProducts/>
        </div>
        {/* <DashboardTable/> */}
        </>
    );
}
export default Content