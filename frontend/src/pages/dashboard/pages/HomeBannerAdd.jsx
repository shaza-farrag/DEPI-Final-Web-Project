import { useState } from "react";
import { RiSave3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const products = [];

export default function HomeBannerAdd() {
    const [formData, setFormData] = useState({
        offer: "",
        description: "",
    });

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleProduct = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const validate = () => {
        const newErrors = {};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log("Form Data to send:", { ...formData, selectedProducts });
    };

    const handleCancel = () => {
        setFormData({ offer: "", description: "" });
        setSelectedProducts([]);
        setErrors({});
    };

    return (
        <>
            <h1 className="text-4xl font-semibold leading-15 pb-2 pl-2 text-zinc-600">
                Add New Banner
            </h1>
            <p className="text-[16px] pb-7 text-zinc-400 pl-2">
                Add a new banner slide to your home page.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-[2%]">

                    {/* ── Left Section ── */}
                    <div className="w-[65%] bg-white p-5 border-gray-200 border-2 rounded-2xl h-fit">
                        <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Banner Information</h3>
                        
                        {/* Products table (scrollable) */}
                        <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Select Products</h4>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="max-h-72 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-[#F5F5F5] z-10">
                                        <tr>
                                            <th className="text-left font-semibold text-zinc-500 px-3 py-2">Image</th>
                                            <th className="text-left font-semibold text-zinc-500 px-3 py-2">Name</th>
                                            <th className="text-left font-semibold text-zinc-500 px-3 py-2">Price</th>
                                            <th className="text-center font-semibold text-zinc-500 px-3 py-2">Select</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="border-t border-gray-100 hover:bg-[#FBF3F8] transition-colors"
                                            >
                                                <td className="px-3 py-2">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-11 h-11 object-cover rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-3 py-2 text-zinc-600 font-medium">
                                                    {product.name}
                                                </td>
                                                <td className="px-3 py-2 text-zinc-600">
                                                    {product.price} EGP
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts.includes(product.id)}
                                                        onChange={() => toggleProduct(product.id)}
                                                        className="w-4 h-4 accent-[#D797C6] cursor-pointer"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                                            No products Found
                                            </td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Offer (اختياري) */}
                        <label className="block mb-4">
                            <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Offer</h4>
                            <input
                                type="text"
                                name="offer"
                                value={formData.offer}
                                onChange={handleChange}
                                placeholder="Enter offer (optional)"
                                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200"
                            />
                        
                            {errors.offer && <p className="text-red-500 text-sm mt-1">{errors.offer} </p>} 
                        </label>

                        {/* Description */}
                        <label className="block mb-5">
                            <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Description</h4>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter banner description"
                                className="bg-[#F5F5F5] p-2 w-full h-30 rounded-lg focus:outline-gray-200"
                            />
                        </label>


                    </div>


                    <div className="flex flex-col w-[35%] gap-4">

                        {/* Actions */}
                        <div className="bg-white p-5 border-gray-200 border-2 rounded-2xl">
                            <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Action</h3>
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 w-full bg-[#D797C6] h-9 text-white font-semibold hover:bg-[#B6679F] mb-3 rounded">
                                <RiSave3Line className="text-[20px]" />
                                Save Banner
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center justify-center gap-2 w-full bg-white border border-[#D797C6] h-9 text-zinc-500 font-semibold hover:border-[#B6679F] hover:border-2 rounded">
                                <RxCross2 className="text-[20px]" />
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </>
    );
}