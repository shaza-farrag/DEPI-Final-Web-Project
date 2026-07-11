import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Pencil, Trash2 } from "lucide-react";
const mockCategories = [];


export default function CategoryList() {
    const navigate = useNavigate();
    const [deleteTarget, setDeleteTarget] = useState(null);
    const ITEMS_PER_PAGE = 10;

    const [categories, setCategories]   = useState([]);
    const [loading, setLoading]         = useState(true);
    const [searchTerm, setSearchTerm]   = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]   = useState(1);
    const [totalItems, setTotalItems]   = useState(0);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        fetchCategories();
    }, [currentPage, searchTerm]);

    const fetchCategories = async () => {
        try {
            setLoading(true);

            let filtered = [...mockCategories];

            if (searchTerm.trim()) {
                filtered = filtered.filter((c) =>
                    c.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const paginated  = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            setCategories(paginated);
            setTotalItems(filtered.length);
            setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
           

        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        navigate(`/dashboard/category/edit/${category._id}`, {
            state: { category },
        });
    };

    function confirmDelete(id) {
    setCategories((prev) => prev.filter((b) => b.id !== id));
    setDeleteTarget(null);
  }


    return (
        <div className="relative overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200">
            <div className="flex py-6">
                <h1 className="ml-5 font-semibold text-4xl">Categories</h1>
                <button
                    onClick={() => navigate("/dashboard/category/add")}
                    className="font-medium w-35 absolute right-4 py-2 leading-9 bg-[#D797C6] text-white rounded-md cursor-pointer hover:bg-[#B6679F]"
                >
                    + Add Category
                </button>
            </div>

            {/* Search */}
            <div className="p-4 flex items-center justify-between border-b pb-6 border-gray-300">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-5 pr-10 py-3 bg-[#F5F5F5] rounded-lg focus:outline-none focus:border-pink-500"
                    />
                    <FiSearch className="absolute right-4 top-4 text-gray-400" />
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-[#F2DCDC]">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Category Name</th>
                        <th className="px-6 py-4">Products Count</th>
                        <th className="px-6 py-4">Created At</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center py-10">Loading...</td>
                        </tr>
                    ) : categories.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-10 text-gray-500">
                                No Categories Found
                            </td>
                        </tr>
                    ) : (
                        categories.map((category) => (
                            <tr
                                key={category._id}
                                className="border-b border-gray-300 hover:bg-pink-50 transition"
                            >
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    #{category._id}
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {category.name}
                                </td>

                                <td className="px-6 py-4">
                                    {category.productsCount} products
                                </td>

                                <td className="px-6 py-4 text-gray-500">
                                    {category.createdAt}
                                </td>


                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        category.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}>
                                        {category.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                        onClick={() => handleEdit(category)}
                                        aria-label="Edit banner"
                                        className="p-2 rounded-md text-[#7a7171] hover:text-[#D797C6] hover:bg-[#F8ECEC]! transition-colors cursor-pointer"
                                        >
                                        <Pencil size={16} />
                                        </button>
                                        <button
                                        onClick={() => setDeleteTarget(category.id)}
                                        aria-label="Delete banner"
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

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-gray-300">
                <span className="text-sm text-gray-600">
                    Showing {totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
                </span>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="font-medium">{currentPage} / {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
            
        {deleteTarget !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-xl p-9 w-90 shadow-lg text-center!">
            <h2 className=" font-semibold text-2xl mb-2">Delete category</h2>
            <p className="text-gray-500 text-sm mb-5">
             Are you sure to delete this category ?
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