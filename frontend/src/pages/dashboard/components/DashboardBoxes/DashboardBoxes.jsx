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
        className="dashboardBoxesSlide "
      >
        <SwiperSlide>
            <div className="box p-3 rounded-md border border-[rgba(0,0,0,0.2)] flex  items-center
            gap-3 bg-white cursor-pointer  ">
                <AiTwotoneGift className="text-5xl text-[#C95E91]" />
                <div className="list info w-[70%] font-medium! text-[#7a7171]! ">
                    <span className="block text-[18px]">New Orders</span>
                    <h3 className="text-[#383338] text-[22px]! font-extrabold!">1,390</h3>
                </div>
                <div className="flex gap-1.5 items-end ">
                    <div className="w-[5px] h-[40px] bg-[#C95E91] rounded-xl "></div>
                    <div className="w-[5px] h-[30px] bg-[#C95E91] rounded-xl "></div>
                    <div className="w-[5px] h-[20px] bg-[#C95E91] rounded-xl "></div>
                    <div className="w-[5px] h-[30px] bg-[#C95E91] rounded-xl "></div>
                    <div className="w-[5px] h-[20px] bg-[#C95E91] rounded-xl "></div>
                    <div className="w-[5px] h-[30px] bg-[#C95E91] rounded-xl "></div>
                    <div className="w-[5px] h-[40px] bg-[#C95E91] rounded-xl "></div>
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide>
            <div className="box p-3 rounded-md border border-[rgba(0,0,0,0.2)] flex  items-center
            gap-3 bg-white cursor-pointer  ">
                <PiChartPieSliceDuotone  className="text-5xl text-[#10B981]" />
                <div className="list info w-[70%] font-medium! text-[#7a7171]! ">
                    <span className="block text-[18px]">Sales</span>
                    <h3 className="text-[#383338] text-[20px]! font-extrabold!">$57,890</h3>
                </div>
                <div className="flex gap-1.5 items-end ">
                    <div className="w-[5px] h-[20px] bg-[#10B981] rounded-xl "></div>
                    <div className="w-[5px] h-[40px] bg-[#10B981] rounded-xl "></div>
                    <div className="w-[5px] h-[30px] bg-[#10B981] rounded-xl "></div>
                    <div className="w-[5px] h-[40px] bg-[#10B981] rounded-xl "></div>
                    <div className="w-[5px] h-[20px] bg-[#10B981] rounded-xl "></div>
                    <div className="w-[5px] h-[40px] bg-[#10B981] rounded-xl "></div>
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide>
            <div className="box p-3 rounded-md border border-[rgba(0,0,0,0.2)] flex  items-center
            gap-3 bg-white cursor-pointer  ">
                <PiBankLight  className="text-6xl text-[#7928CA]" />
                <div className="list info w-[70%] font-medium! text-[#7a7171]! ">
                    <span className="block text-[18px]">Revenue</span>
                    <h3 className="text-[#383338] text-[20px]! font-extrabold!">$12,390</h3>
                </div>
                <div className="flex gap-1.5 items-end ">
                    <div className="w-[5px] h-[20px] bg-[#7928CA] rounded-xl "></div>
                    <div className="w-[5px] h-[30px] bg-[#7928CA] rounded-xl "></div>
                    <div className="w-[5px] h-[40px] bg-[#7928CA] rounded-xl "></div>
                    <div className="w-[5px] h-[30px] bg-[#7928CA] rounded-xl "></div>
                    <div className="w-[5px] h-[20px] bg-[#7928CA] rounded-xl "></div>
                    <div className="w-[5px] h-[25px] bg-[#7928CA] rounded-xl "></div>
                    <div className="w-[5px] h-[40px] bg-[#7928CA] rounded-xl "></div>
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide>
            <div className="box p-3 rounded-md border border-[rgba(0,0,0,0.2)] flex  items-center
            gap-3 bg-white cursor-pointer  ">
                <TbBrandProducthunt   className="text-6xl text-[#3872FA]" />
                <div className="list info w-[70%] font-medium! text-[#7a7171]! ">
                    <span className="block text-[18px]">Total Profit</span>
                    <h3 className="text-[#383338] text-[20px]! font-extrabold!">$30,990</h3>
                </div>
                <div className="flex gap-1.5 items-end ">
                    <div className="w-[5px] h-[20px] bg-[#3872FA] rounded-xl "></div>
                    <div className="w-[5px] h-[30px] bg-[#3872FA] rounded-xl "></div>
                    <div className="w-[5px] h-[40px] bg-[#3872FA] rounded-xl "></div>
                    <div className="w-[5px] h-[30px] bg-[#3872FA] rounded-xl "></div>
                    <div className="w-[5px] h-[20px] bg-[#3872FA] rounded-xl "></div>
                    <div className="w-[5px] h-[25px] bg-[#3872FA] rounded-xl "></div>
                    <div className="w-[5px] h-[40px] bg-[#3872FA] rounded-xl "></div>
                </div>
            </div>

        </SwiperSlide>



        </Swiper>
        </>
    );
}
export default DashboardBoxes