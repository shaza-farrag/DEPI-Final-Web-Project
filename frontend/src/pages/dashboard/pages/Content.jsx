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

        <div className="lg:flex lg:flex-row gap-8 mb-8 sm:flex-col ">
        <AreaChartSales />
        <PieChartOrders/>
        </div>
        <div className="lg:flex lg:flex-row gap-8 sm:flex-col">
        <RevenueCategory/>
        <TopProducts/>
        </div>
        {/* <DashboardTable/> */}
        </>
    );
}
export default Content