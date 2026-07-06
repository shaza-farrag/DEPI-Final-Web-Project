import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

// ============================================================
// 🔴 [BACKEND] امسحي الـ array ده بالكامل لما الباك يجهز
// ============================================================
const mockCategories = [
    { _id: "1",  name: "Laptops",    productsCount: 14, createdAt: "2024-01-10", status: "Active"   },
    { _id: "2",  name: "Phones",     productsCount: 22, createdAt: "2024-01-15", status: "Active"   },
    { _id: "3",  name: "Fashion",    productsCount: 8,  createdAt: "2024-02-03", status: "Active"   },
    { _id: "4",  name: "Tablets",    productsCount: 5,  createdAt: "2024-02-20", status: "Active"   },
    { _id: "5",  name: "TVs",        productsCount: 9,  createdAt: "2024-03-01", status: "Inactive" },
    { _id: "6",  name: "Cameras",    productsCount: 3,  createdAt: "2024-03-18", status: "Active"   },
    { _id: "7",  name: "Gaming",     productsCount: 17, createdAt: "2024-04-05", status: "Active"   },
    { _id: "8",  name: "Headphones", productsCount: 11, createdAt: "2024-04-22", status: "Inactive" },
    { _id: "9",  name: "Speakers",   productsCount: 6,  createdAt: "2024-05-10", status: "Active"   },
    { _id: "10", name: "Printers",   productsCount: 4,  createdAt: "2024-05-28", status: "Active"   },
    { _id: "11", name: "Monitors",   productsCount: 7,  createdAt: "2024-06-14", status: "Active"   },
    { _id: "12", name: "Storage",    productsCount: 2,  createdAt: "2024-06-30", status: "Inactive" },
];
// ============================================================

export default function CategoryList() {
    const navigate = useNavigate();
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

            // ============================================================
            // 🔴 [BACKEND] امسحي كل الكود ده (السطور من هنا للـ Pagination)
            // واستبدليه بالنداء ده:
            //
            // const res = await fetch(
            //     `/api/categories?search=${searchTerm}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
            // );
            // const data = await res.json();
            // setCategories(data.categories);
            // setTotalItems(data.totalItems);
            // setTotalPages(data.totalPages);
            //
            // وخلي الباك هو اللي يعمل البحث والـ pagination
            // ============================================================

            // --- الكود المؤقت (هيتمسح لما الباك يجهز) ---
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
            setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
            // --- نهاية الكود المؤقت ---

        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // 🟡 [BACKEND] handleEdit مش محتاجة تتغير كتير،
    // بس تأكدي إن الباك بيرجع نفس الـ fields دي في الـ category object:
    // { _id, name, productsCount, createdAt, status }
    // لو الأسماء اتغيرت (مثلاً "count" بدل "productsCount")،
    // ظبطي الأسماء في الـ JSX تحت بنفس الأسماء اللي الباك بيرجعها
    // ============================================================
    const handleEdit = (category) => {
        navigate(`/dashboard/category/edit/${category._id}`, {
            state: { category },
        });
    };

    // ============================================================
    // 🔴 [BACKEND] دالة الـ Delete - دلوقتي مفيش حاجة بتحصل
    // لما الباك يجهز استبدليها بالنداء ده:
    //
    // const handleDelete = async (id) => {
    //     if (!window.confirm("هل أنت متأكد من حذف هذا الكاتيجوري؟")) return;
    //     await fetch(`/api/categories/${id}`, { method: "DELETE" });
    //     fetchCategories(); // تحديث الجدول بعد الحذف
    // };
    //
    // وغيري زرار الـ Delete تحت يبقى:
    // <button onClick={() => handleDelete(category._id)}>Delete</button>
    // ============================================================


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
                        {/* ============================================================
                            🟡 [BACKEND] عمود Created At
                            الباك المفروض يرجع التاريخ بصيغة ISO زي: "2024-01-10T00:00:00Z"
                            لو كده غيري السطر ده يبقى:
                            {new Date(category.createdAt).toLocaleDateString()}
                            بدل {category.createdAt} عشان يتعرض بشكل منظم
                            ============================================================ */}
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

                                {/* ============================================================
                                    🟡 [BACKEND] لو الباك بيرجع اسم الـ field مختلف
                                    مثلاً "count" بدل "productsCount"، غيري هنا:
                                    {category.count} products
                                    ============================================================ */}
                                <td className="px-6 py-4">
                                    {category.productsCount} products
                                </td>

                                {/* ============================================================
                                    🟡 [BACKEND] لو الباك بيرجع تاريخ ISO، غيري هنا:
                                    {new Date(category.createdAt).toLocaleDateString()}
                                    ============================================================ */}
                                <td className="px-6 py-4 text-gray-500">
                                    {category.createdAt}
                                </td>

                                {/* ============================================================
                                    🟡 [BACKEND] لو الباك بيرجع status بشكل مختلف
                                    مثلاً boolean: { isActive: true } بدل { status: "Active" }
                                    غيري الشرط هنا يبقى:
                                    category.isActive ? "Active" : "Inactive"
                                    ============================================================ */}
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
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="text-pink-600 hover:underline mr-4"
                                    >
                                        Edit
                                    </button>

                                    {/* ============================================================
                                        🔴 [BACKEND] الزرار ده مفيش ليه وظيفة دلوقتي
                                        لما الباك يجهز غيريه يبقى:
                                        <button onClick={() => handleDelete(category._id)}>Delete</button>
                                        ============================================================ */}
                                    <button className="text-red-500 hover:underline">
                                        Delete
                                    </button>
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
        </div>
    );
}