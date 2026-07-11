import { useState, useEffect } from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Trash2 } from "lucide-react";

import {
  getBrands,
  deleteBrand,
  getProductsByBrand,
} from "../../../services/brand.service";

export default function BrandList() {
  const ITEMS_PER_PAGE = 10;

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchBrands = async () => {
    try {
      setLoading(true);

      const res = await getBrands(currentPage, ITEMS_PER_PAGE);
      const fetchedBrands = res.data.brands || [];

      // The brands endpoint doesn't return a product count, so we pull it
      // per-brand from the products-by-brand endpoint.
      const withCounts = await Promise.all(
        fetchedBrands.map(async (brand) => {
          try {
            const productsRes = await getProductsByBrand(brand._id);
            return {
              ...brand,
              productsCount: productsRes.data.products?.length || 0,
            };
          } catch {
            return { ...brand, productsCount: 0 };
          }
        })
      );

      setBrands(withCounts);
      setTotalItems(res.data.totalBrands || 0);
      setTotalPages(Math.max(1, res.data.totalPages || 1));
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async (id) => {
    try {
      setDeleting(true);
      setDeleteError("");

      await deleteBrand(id);

      setDeleteTarget(null);
      await fetchBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
      setDeleteError(
        error?.response?.data?.message ||
          "Something went wrong while deleting this brand."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative p-6 overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#F8ECEC] flex items-center justify-center shrink-0">
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
                Category
              </th>
              <th className="font-bold! text-[#7a7171]! text-right px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : brands.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                  No Brands Found.
                </td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr
                  key={brand._id}
                  className="hover:bg-[#F8ECEC]! transition-all border-b border-[rgba(0,0,0,0.06)]"
                >
                  <td className="font-medium! px-4 py-3">{brand.name}</td>
                  <td className="text-center px-4 py-3 text-gray-500">
                    {brand.productsCount}
                  </td>
                  <td className="px-4 py-3">
                    {brand.category?.name ? (
                      <span className="inline-block mr-1! mb-1! px-2.5 py-1 rounded-full text-xs bg-[#F8ECEC]! text-[#D797C6]!">
                        {brand.category.name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => {
                          setDeleteTarget(brand._id);
                          setDeleteError("");
                        }}
                        aria-label="Delete brand"
                        className="p-2 rounded-md text-[#7a7171] hover:text-red-500 hover:bg-[#F8ECEC]! transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
        <span className="text-sm text-gray-500 text-center sm:text-left">
          Showing {totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <span className="font-medium">{currentPage} / {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-xs shadow-lg">
            <h2 className="text-zinc-700 font-semibold mb-2">Delete Brand?</h2>
            <p className="text-gray-500 text-sm mb-3">
              Are you sure to delete this Brand?
            </p>

            {deleteError && (
              <p className="text-red-500 text-sm mb-3">{deleteError}</p>
            )}

            <div className="flex items-center justify-center gap-6 text-center!">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-md shadow-zinc-400 shadow-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteTarget)}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-md bg-red-500 shadow-zinc-700 shadow-sm hover:bg-red-600 text-white transition-colors cursor-pointer disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}