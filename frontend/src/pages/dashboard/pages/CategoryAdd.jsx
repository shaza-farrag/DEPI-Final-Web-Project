import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { TbCategory } from "react-icons/tb";

function CategoryAdd() {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please, Enter the category name!");
      return;
    }

    // هنا هتحطي الـ API call بتاعك لإضافة الكاتيجوري
    console.log("Category to add:", categoryName);

    // مسح الحقل بعد الإضافة
    setCategoryName("");
  };

  return (
    <div className="bg-[#F8ECEC] min-h-[82vh] ">
    <div className="p-6 md:p-9 bg-white rounded-md shadow-md border border-[rgba(0,0,0,0.1)] max-w-[500px] mx-auto mt-6">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#F8ECEC] flex items-center justify-center">
          <TbCategory className="text-2xl text-[#D797C6]" />
        </div>
                    <h1 className="text-3xl font-semibold leading-15 pb-2 pl-2 text-zinc-600">
                Add New Product
            </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <button
          type="submit"
          className="font-medium leading-9 bg-[#D797C6] text-white
          rounded-md cursor-pointer hover:bg-[#B6679F] w-full sm:w-40"
        >
          + Add Category
        </button>

      </form>
    </div>
    </div>
  );
}

export default CategoryAdd;