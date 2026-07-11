import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { TbCategory } from "react-icons/tb";

import { createCategory } from "../../../services/category.service";

function CategoryAdd() {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!categoryName.trim()) {
      setError("Please enter the category name!");
      return;
    }

    try {
      setSubmitting(true);

      await createCategory({ name: categoryName.trim() });

      setCategoryName("");
      navigate("/dashboard/category");
    } catch (err) {
      console.error("Error creating category:", err);
      setError(
        err?.response?.data?.message || "Something went wrong while saving the category."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8ECEC] min-h-[82vh] ">
      <div className="p-6 md:p-9 bg-white rounded-md shadow-md border border-[rgba(0,0,0,0.1)] max-w-[500px] mx-auto mt-6">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#F8ECEC] flex items-center justify-center shrink-0">
            <TbCategory className="text-2xl text-[#D797C6]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight sm:leading-15 pb-2 pl-2 text-zinc-600">
            Add New Category
          </h1>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            disabled={submitting}
          />

          <button
            type="submit"
            disabled={submitting}
            className="font-medium leading-9 bg-[#D797C6] text-white
          rounded-md cursor-pointer hover:bg-[#B6679F] w-full sm:w-40 disabled:opacity-60"
          >
            {submitting ? "Adding..." : "+ Add Category"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CategoryAdd;