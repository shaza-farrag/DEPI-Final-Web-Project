import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Button } from "@mui/material";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagHandleOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import {Collapse} from 'react-collapse';
import './DashboardSidebar.css';
import { useState } from "react";

function DashboardSidebar() {
    const [subMenuIndex , setSubMenuIndex] = useState(null);
    const isOpenSubMenu = (index) =>{
        if (subMenuIndex==index){
            setSubMenuIndex(null)
        }else{
        setSubMenuIndex(index)
    }
    };
    return(
        <>
        <div className="sidebar fixed top-0 left-0 bg-[#ffffff] w-[20%] h-full border-r border-[rgba(0,0,0,0.1)]
        py-2 px-4">
            <div className="w-full ">
                <Link to="/"><img src={logo} className="w-[120px] mx-auto py-2  " ></img>
            
                </Link>
            </div>

            <ul className="lmt-4">
                
                <li>
                    <Link to="/dashboard">
                    <Button className=" list w-full capitalize! justify-start! flex gap-3 text-[16px]! 
                 text-[#7a7171]! font-extrabold! items-center py-2! hover:bg-[#f1f1f1]!">
                    <MdOutlineDashboardCustomize className="text-[20px]" />Dashboard</Button>
                    </Link>
                </li>  


                <li>
                    <Button className=" list w-full capitalize! justify-start! flex gap-3 text-[16px]! 
                 text-[#7a7171]! font-extrabold! items-center py-2! hover:bg-[#f1f1f1]!" onClick={() => isOpenSubMenu (1)}>
                    <IoImageOutline className="text-[20px]" />Home Slides
                    <span className="w-7.5 ml-auto h-7.5 flex justify-center items-center "
                     >
                        <FaAngleDown className={`transition-all ${subMenuIndex ===1 ? `rotate-180` : ``}`}/>
                    </span>
                    </Button>

                    <Collapse isOpened={subMenuIndex ===1 ? true: false }>
                    <ul className="w-full! ">
                        <li className="w-full ">
                            <Button className=" list text-[#7a7171]! capitalize! flex justify-start! w-full! text-[14px]! font-[600]!
                            pl-9! gap-3 "><span className="block w-2.5 h-2.5 rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,1)] "></span>
                            Home banners list</Button>
                        </li>
                        <li className="w-full!">
                            <Button className=" list text-[#7a7171]! capitalize! flex justify-start! w-full! text-[14px]! font-[600]! 
                             pl-9! gap-3 "><span className="block w-2.5 h-2.5 rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,1)] "></span>
                                Add Home banner slide</Button>
                        </li>                        
                    </ul>
                    </Collapse>
                </li>                


                <li>
                    <Link to="/dashboard/users">
                    <Button className=" list w-full capitalize! justify-start! flex gap-3 text-[16px]! 
                 text-[#7a7171]! font-extrabold! items-center py-2! hover:bg-[#f1f1f1]!">
                    <LuUsers  className="text-[20px]" />Users</Button>
                    </Link>
                </li>  

                <li><Button className=" list w-full capitalize! justify-start! flex gap-3 text-[16px]! 
                 text-[#7a7171]! font-extrabold! items-center py-2! hover:bg-[#f1f1f1]!" onClick={() => isOpenSubMenu (3)}>
                    <RiProductHuntLine className="text-[20px]" />Products
                    <span className="w-7.5 ml-auto h-7.5 flex justify-center items-center "
                     >
                        <FaAngleDown className={`transition-all ${subMenuIndex ===3 ? `rotate-180` : ``}`}/>
                    </span>
                    </Button>

                    <Collapse isOpened={subMenuIndex ===3 ? true: false }>
                    <ul className="w-full! ">
                        <li className="w-full ">
                            <Link to="/products">
                            <Button className=" list text-[#7a7171]! capitalize! flex justify-start! w-full! text-[14px]! font-[600]!
                            pl-9! gap-3 "><span className="block w-2.5 h-2.5 rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,1)] "></span>
                            Product list</Button>
                            </Link>
                        </li>
                        <li className="w-full!">
                            <Link to="/product/upload">
                            <Button className=" list text-[#7a7171]! capitalize! flex justify-start! w-full! text-[14px]! font-[600]! 
                             pl-9! gap-3 "><span className="block w-2.5 h-2.5 rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,1)] "></span>
                                Product Upload</Button>
                                </Link>
                        </li>                        
                    </ul>
                    </Collapse>
                </li>  
                
                <li><Button className=" list w-full capitalize! justify-start! flex gap-3 text-[16px]! 
                 text-[#7a7171]! font-extrabold! items-center py-2! hover:bg-[#f1f1f1]!" onClick={() => isOpenSubMenu (4)}>
                    <TbCategory className="text-[20px]" />Category
                    <span className="w-7.5 ml-auto h-7.5 flex justify-center items-center "
                     >
                        <FaAngleDown className={`transition-all ${subMenuIndex ===4 ? `rotate-180` : ``}`}/>
                    </span>
                    </Button>

                    <Collapse isOpened={subMenuIndex ===4 ? true: false }>
                    <ul className="w-full! ">
                        <li className="w-full ">
                            <Link to="/catrgories">
                            <Button className=" list text-[#7a7171]! capitalize! flex justify-start! w-full! text-[14px]! font-[600]!
                            pl-9! gap-3 "><span className="block w-2.5 h-2.5 rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,1)] "></span>
                            Category list</Button>
                            </Link>
                        </li>
                        <li className="w-full!">
                            <Link to="/catrgory/add">
                            <Button className=" list text-[#7a7171]! capitalize! flex justify-start! w-full! text-[14px]! font-[600]! 
                             pl-9! gap-3 "><span className="block w-2.5 h-2.5 rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,1)] "></span>
                                Add a Category</Button>
                                </Link>
                        </li> 
                        <li className="w-full!">
                            <Link to="/catrgory/sub">
                            <Button className=" list text-[#7a7171]! capitalize! flex justify-start! w-full! text-[14px]! font-[600]! 
                             pl-9! gap-3 "><span className="block w-2.5 h-2.5 rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,1)] "></span>
                                Sub Category List</Button>
                                </Link>
                        </li> 
                        <li className="w-full!">
                            <Link to="/catrgorysub/add">
                            <Button className=" list text-[#7a7171]! capitalize! flex justify-start! w-full! text-[14px]! font-[600]! 
                             pl-9! gap-3 "><span className="block w-2.5 h-2.5 rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(0,0,0,1)] "></span>
                                Add a Sub Category List</Button>
                                </Link>
                        </li>                                                                        
                    </ul>
                    </Collapse>
                </li> 

                <li>
                    <Link to="/dashboard/orders">
                    <Button className=" list w-full capitalize! justify-start! flex gap-3 text-[16px]! 
                 text-[#7a7171]! font-extrabold! items-center py-2! hover:bg-[#f1f1f1]!">
                    <IoBagHandleOutline  className="text-[20px]" />Orders</Button>
                    </Link>
                </li>   
 
  

                <li><Button className=" list w-full capitalize! justify-start! flex gap-3 text-[16px]! 
                 text-[#7a7171]! font-extrabold! items-center py-2! hover:bg-[#f1f1f1]!">
                    <FiLogOut className="text-[20px]" />Logout</Button>
                </li>   



            </ul>

        </div>
        </>
    );
}
export default DashboardSidebar