import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // 
// import DashboardTable from "../components/DashboardTable/DashboardTable";
import { FiUpload } from "react-icons/fi";
import { RiSave3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const mapProductToFormData = (product) => ({
    name: product.name || "",
    sku: product.sku || "", 
    category: product.category?.name || "All", 
    description: product.description || "",
    price: product.price != null ? String(product.price) : "",
    stock: product.stock != null ? String(product.stock) : "",
    status: product.stock > 0 ? "All" : "Phones", 
    supplier: product.supplier || "",
    image: null,
});

export default function ProductsEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); 

    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "All",
        description: "",
        price: "",
        stock: "",
        status: "All",
        supplier: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLoading(true);
        setLoadError(null);

        const productFromTable = location.state?.product; 

        if (productFromTable) {
           
            setFormData(mapProductToFormData(productFromTable));
            if (productFromTable.image?.url) {
                setImagePreview(productFromTable.image.url);
            }
            setLoading(false);
        } else {
            
            setLoadError(
                "تعذر تحميل بيانات المنتج مباشرة. من فضلك ارجع لصفحة المنتجات واضغط Edit من الجدول."
            );
            setLoading(false);
        }
    }, [id, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "اسم المنتج مطلوب";
        if (!formData.sku.trim()) newErrors.sku = "الـ SKU مطلوب";
        if (formData.category === "All") newErrors.category = "اختار الفئة";
        if (!formData.price || Number(formData.price) <= 0) newErrors.price = "السعر مطلوب ولازم يكون أكبر من صفر";
        if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = "الكمية مطلوبة";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // MOCK: السطر ده هيتستبدل بنداء حقيقي لما الباك يخلص، مثلاً:
        // await api.put(`/products/${id}`, formData);
        console.log("Updated Product Data (id:", id, "):", formData);

        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="p-10 text-center text-zinc-500 text-lg">
                جارِ تحميل بيانات المنتج...
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="p-10 text-center text-red-500 text-lg">
                {loadError}
                {/* [تعديل] زرار يرجعها لصفحة الجدول بسهولة بدل ما تفضل عالقة */}
                <div className="mt-4">
                    <button
                        onClick={() => navigate("/dashboard/products")}
                        className="px-5 py-2 bg-[#D797C6] text-white rounded-lg hover:bg-[#B6679F]"
                    >
                        الرجوع لقائمة المنتجات
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-4xl font-semibold leading-15 pb-2 pl-2 text-zinc-600">
                Edit Product
            </h1>
            <p className="text-[16px] pb-7 text-zinc-400 pl-2 ">
                Update the product information below.
            </p>

            {saveSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                    تم حفظ التعديلات بنجاح (محليًا - لسه مش متصل بالباك)
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex  gap-[2%] h-[70vh]">
                    <div className="w-[65%] bg-white p-5 border-gray-200 border-2 rounded-2xl h-fit ">
                        <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Product Information</h3>
                        <label className="block">
                            <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Product Name *</h4>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1" />
                            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                        </label>

                        <div className="flex justify-between mb-2">
                            <span className="text-zinc-500  text-[16px] font-semibold"> SKU *</span>
                            <span className="text-zinc-500  text-[16px] font-semibold"> Category *</span>
                        </div>

                        <div className="flex gap-[5%] ">
                            <div className="w-[50%]">
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    placeholder="e.g./PRD-2024-001"
                                    className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1 " />
                                {errors.sku && <p className="text-red-500 text-sm">{errors.sku}</p>}
                            </div>
                            <div className="w-[50%]">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1  "
                                >
                                    <option value="All"> All Categories </option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Phones">Phones</option>
                                    <option value="Fashion">Fashion</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                            </div>
                        </div>
                        <label className="block">
                            <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Description</h4>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product discription"
                                className="bg-[#F5F5F5] p-2 w-full h-30 rounded-lg focus:outline-gray-200 mb-3 flex items-start" />
                        </label>
                    </div>

                    <div className="flex-row w-[35%]  ">
                        <div className="w-full  bg-white p-5 h-fit border-gray-200 border-2 rounded-2xl mb-5 ">
                            <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Product Image</h3>
                            <div className=" border-dashed border-2 border-gray-200  items-center p-5 rounded-xl  text-center">
                                <label className="cursor-pointer">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Product preview"
                                            className="mx-auto mb-3 max-h-32 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <FiUpload className="items-center mx-auto text-5xl text-gray-400 mb-3" />
                                    )}

                                    <span className="text-gray-600 font-medium ">
                                        {imagePreview ? "Change image" : "Drop your image here"}
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>

                                <p className="text-sm text-gray-400 mt-2">
                                    Supports: JPG, PNG, GIF (Max 5MB)
                                </p>
                            </div>

                        </div>
                        <div className="w-full  bg-white p-5 h-fit border-gray-200 border-2 rounded-2xl ">
                            <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Action</h3>
                            <button
                                type="submit"
                                className="block w-full bg-[#D797C6] h-8 text-white font-semibold hover:bg-[#B6679F] mb-3 items-center">
                                <RiSave3Line className="inline pr-2 text-[26px]" />
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="block w-full bg-white border border-[#D797C6] h-8 text-zinc-500 font-semibold hover:border-[#B6679F] hover:border-2">
                                <RxCross2 className="inline pr-2 text-[26px]" />
                                Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="w-[65%] bg-white p-5 border-gray-200 border-2 rounded-2xl h-fit ">
                    <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Pricing & Inventory</h3>
                    <div className="flex justify-between mb-2">
                        <span className="text-zinc-500  text-[16px] font-semibold"> Price *</span>
                        <span className="text-zinc-500  text-[16px] font-semibold"> Stock Quantity *</span>
                    </div>

                    <div className="flex gap-[5%] ">
                        <div className="w-[50%]">
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="$ 0.00"
                                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1 " />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                        </div>
                        <div className="w-[50%]">
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1  " />
                            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                        </div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-zinc-500  text-[16px] font-semibold"> Stock Status</span>
                        <span className="text-zinc-500  text-[16px] font-semibold"> Supplier</span>
                    </div>

                    <div className="flex gap-[5%] ">
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="bg-[#F5F5F5] p-2 w-[50%] h-9 rounded-lg focus:outline-gray-200 mb-3  "
                        >
                            <option value="All"> In Stock </option>
                            <option value="Phones">Low Stock</option>
                            <option value="Laptops">Out of Stock</option>
                        </select>
                        <input
                            type="text"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            placeholder="Supplier name"
                            className="bg-[#F5F5F5] p-2 w-[50%] h-9 rounded-lg focus:outline-gray-200 mb-3  " />
                    </div>
                </div>
            </form>
        </>
    );
}

// [ملاحظة هامة] لما الباك يخلص لازم تعمل الآتي:
// 1. تستبدل الاعتماد على location.state بنداء API حقيقي دايمًا، مثلاً:
//    useEffect(() => { fetch(`/api/products/${id}`).then(...) }, [id]);
//    وده هيخليها تشتغل صح حتى لو المستخدم فتح اللينك مباشرة أو عمل refresh (مش هتحتاج fallback تاني).
// 2. الـ DashboardTable هيرجع يجيب بيانات المنتجات من API بدل mockProducts، فالـ category.name و
//    image.url هيفضلوا بنفس الشكل لو السيرفر بيرجعهم بنفس الـ structure، أو هتحتاج تظبط mapProductToFormData
//    على حسب شكل response الباك الفعلي.
// 3. جوه handleSubmit تستبدل الـ console.log بنداء PUT/PATCH حقيقي للـ API.
// 4. حقل sku و supplier مش موجودين في بيانات الجدول الحالية، تأكدي إن الباك بيرجعهم مع باقي بيانات المنتج.