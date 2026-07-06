import { useState } from "react"; // [تعديل] رجّعنا الـ import بتاع useState عشان نقدر نعمل state للفورم
// import DashboardTable from "../components/DashboardTable/DashboardTable";
import { FiUpload } from "react-icons/fi";
import { RiSave3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export default function ProductsAdd() {

    // [تعديل] عملنا state واحد (object) فيه كل بيانات الفورم بدل ما كل input يكون uncontrolled
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

    // [تعديل] state منفصل لمعاينة الصورة (preview)
    const [imagePreview, setImagePreview] = useState(null);

    // [تعديل] state للـ errors بتاعة الـ validation
    const [errors, setErrors] = useState({});

    // [تعديل] handler عام لأي input/select/textarea بيغير قيمته في formData
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // [تعديل] handler خاص برفع الصورة، بيحفظ الملف وبيعمل preview ليه
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // [تعديل] دالة validation بسيطة على الحقول المطلوبة (اللي عليها *)
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

    // [تعديل] handler بتاع الـ submit، هنا هتحط لاحقًا نداء الـ API بتاع الباك
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // TODO: استدعاء الـ API هنا لما الباك يخلص
        console.log("Form Data to send:", formData);
    };

    // [تعديل] handler لزرار الـ Cancel، بيعمل reset لكل الفورم
    const handleCancel = () => {
        setFormData({
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
        setImagePreview(null);
        setErrors({});
    };

    return (
        <>
            <h1 className="text-4xl font-semibold leading-15 pb-2 pl-2 text-zinc-600">
                Add New Product
            </h1>
            <p className="text-[16px] pb-7 text-zinc-400 pl-2 ">
                Create a new product and add it to your inventory.
            </p>

            {/* [تعديل] لفينا كل الفورم جوه <form> واحد مع onSubmit، بدل ما يكون مجرد divs */}
            <form onSubmit={handleSubmit}>
                <div className="flex  gap-[2%] h-[70vh]">
                    <div className="w-[65%] bg-white p-5 border-gray-200 border-2 rounded-2xl h-fit ">
                        <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Product Information</h3>
                        <label className="block">
                            <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Product Name *</h4>
                            <input
                                type="text"
                                name="name" // [تعديل] أضفنا name عشان handleChange يعرف يحدث الحقل الصح
                                value={formData.name} // [تعديل] ربطنا الـ value بالـ state (controlled input)
                                onChange={handleChange} // [تعديل] أضفنا onChange
                                placeholder="Enter product name"
                                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200 mb-1" />
                            {/* [تعديل] عرض رسالة الخطأ لو الحقل فاضي بعد محاولة submit */}
                            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                        </label>

                        <div className="flex justify-between mb-2"> {/* [تعديل] استبدلنا gap-[48%] بـ justify-between عشان توزيع أنضف وresponsive */}
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
                                    {/* [تعديل] لو فيه preview نعرضه بدل الأيقونة، عشان المستخدم يشوف الصورة اللي اختارها */}
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
                                        onChange={handleImageChange} // [تعديل] أضفنا onChange لرفع الصورة وعمل preview ليها
                                    />
                                </label>

                                <p className="text-sm text-gray-400 mt-2">
                                    Supports: JPG, PNG, GIF (Max 5MB)
                                </p>
                            </div>

                        </div>
                        <div className="w-full  bg-white p-5 h-fit border-gray-200 border-2 rounded-2xl ">
                            <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Action</h3>
                            {/* [تعديل] زرار الـ Save بقى type="submit" عشان يبعت الفورم فعليًا */}
                            <button
                                type="submit"
                                className="block w-full bg-[#D797C6] h-8 text-white font-semibold hover:bg-[#B6679F] mb-3 items-center">
                                <RiSave3Line className="inline pr-2 text-[26px]" />
                                Save Product</button>
                            {/* [تعديل] زرار الـ Cancel بقى type="button" (عشان مايعملش submit) وأضفنا onClick=handleCancel */}
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
                    <div className="flex justify-between mb-2"> {/* [تعديل] استبدلنا gap-[48%] بـ justify-between */}
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
                    <div className="flex justify-between mb-2"> {/* [تعديل] استبدلنا gap-[40%] بـ justify-between */}
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

// [ملاحظة] DashboardTable متستوردش وملوش استخدام في الصفحة دي.
// سبناه زي ما هو لإنه ممكن يكون استيراد متبقي من نسخة قديمة،
// لو مش هتستخدمه شيله عشان تشيل الـ warning بتاع unused import.