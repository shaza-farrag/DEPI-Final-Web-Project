import { useState } from "react";
import DashboardTable from "../components/DashboardTable/DashboardTable";
import { FiUpload } from "react-icons/fi";
import { RiSave3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
export default function ProductsAdd(){


    return(
       <>
       <h1 className="text-4xl font-semibold leading-15 pb-2 pl-2 text-zinc-600">
        Add New Product
        </h1>
       <p className="text-[16px] pb-7 text-zinc-400 pl-2 ">
        Create a new product and add it to your inventory.
        </p>

        <div className="flex  gap-[2%] h-[70vh]">
            <div className="w-[65%] bg-white p-5 border-gray-200 border-2 rounded-2xl h-fit ">
                <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Product Information</h3>
                <label className="block">
                   <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Product Name *</h4> 
                    <input 
                    type="text"
                     placeholder="Enter product name"
                     className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-3" />
                </label>

                <div className="flex gap-[48%] mb-2">
                    <span className="text-zinc-500  text-[16px] font-semibold"> SKU *</span>
                    <span className="text-zinc-500  text-[16px] font-semibold"> Category *</span>
                </div>
                
                <div className="flex gap-[5%] ">
                    <input
                    type="text"
                    placeholder="e.g./PRD-2024-001"
                    className="bg-[#F5F5F5] p-2 w-[50%] h-9 rounded-lg focus:outline-gray-200 mb-3 " />
                    <select
                    
                        className="bg-[#F5F5F5] p-2 w-[50%] h-9 rounded-lg focus:outline-gray-200 mb-3  "
                    >
                            <option value="All" > All Categories </option>
                            <option value="Laptops">Laptops</option>
                            <option value="Phones">Phones</option>
                            <option value="Fashion">Fashion</option>
                        </select>
             
                </div>
                <label className="block">
                   <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Description</h4> 
                    
                    <textarea
                     type="text"
                     placeholder="Enter product discription"

                      className="bg-[#F5F5F5] p-2 w-full h-30 rounded-lg focus:outline-gray-200 mb-3 flex items-start"/>
                </label>
            </div>

            <div className="flex-row w-[35%]  ">
                <div className="w-full  bg-white p-5 h-fit border-gray-200 border-2 rounded-2xl mb-5 ">
                    <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Product Image</h3>
                    <div className=" border-dashed border-2 border-gray-200  items-center p-5 rounded-xl  text-center">
                        <label className="cursor-pointer">
                            <FiUpload className="items-center mx-auto text-5xl text-gray-400 mb-3" />

                            <span className="text-gray-600 font-medium ">
                            Drop your image here
                            </span>

                            <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            />
                        </label>

                        <p className="text-sm text-gray-400 mt-2">
                            Supports: JPG, PNG, GIF (Max 5MB)
                        </p>
                    </div>

                </div>
                <div className="w-full  bg-white p-5 h-fit border-gray-200 border-2 rounded-2xl ">
                    <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Action</h3>
                    <button className="block w-full bg-[#D797C6] h-8 text-white font-semibold hover:bg-[#B6679F] mb-3 items-center">
                        <RiSave3Line className="inline pr-2 text-[26px]"/> 
                        Save Product</button>
                    <button className="block w-full bg-white border border-[#D797C6] h-8 text-zinc-500 font-semibold hover:border-[#B6679F] hover:border-2">
                        <RxCross2 className="inline pr-2 text-[26px]" />
                        Cancel</button>


                </div>
            </div>
        </div>
        <div className="w-[65%] bg-white p-5 border-gray-200 border-2 rounded-2xl h-fit ">
            <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Pricing & Inventory</h3>
                <div className="flex gap-[48%] mb-2">
                    <span className="text-zinc-500  text-[16px] font-semibold"> Price *</span>
                    <span className="text-zinc-500  text-[16px] font-semibold"> Stock Quantity *</span>
                </div>
                
                <div className="flex gap-[5%] ">
                    <input
                    type="number"
                    placeholder="$ 0.00"
                    className="bg-[#F5F5F5] p-2 w-[50%] h-9 rounded-lg focus:outline-gray-200 mb-3 " />
                    <input
                        type="number"
                        placeholder="0"
                        className="bg-[#F5F5F5] p-2 w-[50%] h-9 rounded-lg focus:outline-gray-200 mb-3  "/>
                </div>
                <div className="flex gap-[40%] mb-2">
                    <span className="text-zinc-500  text-[16px] font-semibold"> Stock Status</span>
                    <span className="text-zinc-500  text-[16px] font-semibold"> Supplier</span>
                </div>
                
                <div className="flex gap-[5%] ">
                    <select
                    
                        className="bg-[#F5F5F5] p-2 w-[50%] h-9 rounded-lg focus:outline-gray-200 mb-3  "
                    >
                            <option value="All" > In Stock </option>
                            <option value="Phones">Low Stock</option>
                            <option value="Laptops">Out of Stock</option>
                            
                        </select>
                    <input
                        type="text"
                        placeholder="Supplier name"
                        className="bg-[#F5F5F5] p-2 w-[50%] h-9 rounded-lg focus:outline-gray-200 mb-3  "/>
                </div>

        </div>
       </>
    );
}