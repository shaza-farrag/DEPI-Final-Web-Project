import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import "../../dashboard_sidebar/DashboardSidebar.css";
import { AiTwotoneGift } from "react-icons/ai";
import { PiChartPieSliceDuotone } from "react-icons/pi";
import { PiBankLight } from "react-icons/pi";
import { TbBrandProducthunt } from "react-icons/tb";
import DashboardImg from "../../../../assets/DashboardImg.png";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { RiMoneyPoundCircleFill } from "react-icons/ri";



function DashboardBoxes (){
    return(
        <>
        
        <div className=" h-[300px] flex items-start gap-22!  p-9 mb-7  border border-[rgba(0,0,0,0.1)] shadow-md
         rounded-md bg-white" >
            <div className="leading-50 ">
            <div className="flex" >
                <span className="text-4xl font-bold! leading-20">Track. Analyze. Grow.</span>
                <FaArrowTrendUp className="items-start text-5xl mx-5 my-auto text-[#D797C6]" />

                </div>
                <p>Monitor your store's performance and make smarter decisions , everyday </p>
                <Link to="/dashboard/products/upload">
                <button className="font-medium w-35 leading-9 bg-[#D797C6] text-white
                 rounded-md cursor-pointer hover:bg-[#B6679F] "> 
                 + Add Product</button>
                 </Link>
            </div>
            <img src={DashboardImg} className="  w-[40%] p-0 items-start "></img>
        </div>
    <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="dashboardBoxesSlide mb-10 "
        >
        <SwiperSlide>
        <div
            className="bg-white rounded-2xl border border-gray-100
                    p-4 h-[160px] shadow-sm hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300 flex flex-col justify-between"
        >
            <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                <RiMoneyPoundCircleFill className="text-2xl text-green-600" />
            </div>

            <span className="text-sm font-medium text-gray-500">
                Total Revenue
            </span>
            </div>

            <h3 className="text-3xl font-bold text-center text-gray-800">
            EGP 325,000
            </h3>

            <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                ↑ 15%
            </span>

            <span className="text-xs text-gray-400">
                vs last month
            </span>
            </div>
        </div>
        </SwiperSlide>

        {/* Total Orders */}
        <SwiperSlide>
        <div
            className="bg-white rounded-2xl border border-gray-100
                    p-4 h-[160px] shadow-sm hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300 flex flex-col justify-between"
        >
            <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                <PiChartPieSliceDuotone className="text-2xl text-indigo-600" />
            </div>

            <span className="text-sm font-medium text-gray-500">
                Total Orders
            </span>
            </div>

            <h3 className="text-3xl font-bold text-center text-gray-800">
            1,254
            </h3>

            <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">
                ↑ 24
            </span>

            <span className="text-xs text-gray-400">
                Today
            </span>
            </div>
        </div>
        </SwiperSlide>
 
        {/* Total Products */}
        <SwiperSlide>
        <div
            className="bg-white rounded-2xl border border-gray-100
                    p-4 h-[160px] shadow-sm hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300 flex flex-col justify-between"
        >
            <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                <PiBankLight className="text-2xl text-purple-600" />
            </div>

            <span className="text-sm font-medium text-gray-500">
                Total Products
            </span>
            </div>

            <h3 className="text-3xl font-bold text-center text-gray-800">
            320
            </h3>

            <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
                ↑ 8
            </span>

            <span className="text-xs text-gray-400">
                This Week
            </span>
            </div>
        </div>
        </SwiperSlide>
 
        {/* Customers */}
        <SwiperSlide>
        <div
            className="bg-white rounded-2xl border border-gray-100
                    p-4 h-[160px] shadow-sm hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300 flex flex-col justify-between"
        >
            <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                <TbBrandProducthunt className="text-2xl text-amber-500" />
            </div>

            <span className="text-sm font-medium text-gray-500">
                Customers
            </span>
            </div>
            <h3 className="text-3xl font-bold text-center text-gray-800">
            845
            </h3>
            <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-600 text-xs font-semibold">
                ↑ 18
            </span>

            <span className="text-xs text-gray-400">
                New Customers
            </span>
            </div>
        </div>
        </SwiperSlide>
 
        {/* Pending Orders */}
        <SwiperSlide>
            <div
            className="box bg-white rounded-2xl border border-gray-100
                        p-4 shadow-sm hover:shadow-lg cursor-pointer hover:-translate-y-1
                        transition-all duration-300 h-[160px] flex flex-col justify-between"
            >
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                <RiMoneyPoundCircleFill className="text-2xl text-red-500" />
                </div>

                <span className="text-sm font-medium text-gray-500">
                Pending Orders
                </span>
            </div>
            <h3 className="text-3xl font-bold text-center text-gray-800">
                17
            </h3>
            <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Requires Action
                </span>

                <span className="text-red-500 text-lg">↺</span>
            </div>
            </div>
        </SwiperSlide>

        </Swiper>      
        </>
    );
}
export default DashboardBoxes