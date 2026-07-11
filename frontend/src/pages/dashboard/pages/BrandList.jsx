import { useState } from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Trash2 } from "lucide-react";

const initialBrands = [
  {
    id: 1,
    name: "Nike",
    products_count: 24,
    categories: ["Shoes", "Sportswear", "Accessories"],
  },


];

export default function BrandList() {
  const [brands, setBrands] = useState(initialBrands);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function confirmDelete(id) {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    setDeleteTarget(null);
  }

  return (
    <div className="relative p-6 overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#F8ECEC] flex items-center justify-center">
          <MdOutlineLocalOffer className="text-2xl text-[#D797C6]" />
        </div>
        <h1 className="text-2xl font-semibold text-zinc-600">Brands</h1>
      </div>

      <div className="rounded-md! shadow-md! border border-[rgba(0,0,0,0.1)] overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse">
          <thead>
            <tr className="bg-[#F8ECEC]!">
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Brand Name
              </th>
              <th className="font-bold! text-[#7a7171]! text-center px-4 py-3">
                Products Count
              </th>
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Categories
              </th>
              <th className="font-bold! text-[#7a7171]! text-right px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr
                key={brand.id}
                className="hover:bg-[#F8ECEC]! transition-all border-b border-[rgba(0,0,0,0.06)]"
              >
                <td className="font-medium! px-4 py-3">{brand.name}</td>
                <td className="text-center px-4 py-3 text-gray-500">
                  {brand.products_count}
                </td>
                <td className="px-4 py-3">
                  {brand.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-block mr-1! mb-1! px-2.5 py-1 rounded-full text-xs bg-[#F8ECEC]! text-[#D797C6]!"
                    >
                      {category}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => setDeleteTarget(brand.id)}
                      aria-label="Delete brand"
                      className="p-2 rounded-md text-[#7a7171] hover:text-red-500 hover:bg-[#F8ECEC]! transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {brands.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                      No Branda Found .  
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-xl p-6 w-80 shadow-lg">
            <h2 className="text-zinc-700 font-semibold mb-2">Delete Brand?</h2>
            <p className="text-gray-500 text-sm mb-5">
               Are you sure to delete this Brand ? 
            </p>
            <div className="flex  gap-[30%] text-center!">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm rounded-md   shadow-zinc-400 shadow-sm mx-auto text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteTarget)}
                className="px-4 py-2 mx-auto text-sm rounded-md bg-red-500 shadow-zinc-700 shadow-sm hover:bg-red-600 text-white transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}