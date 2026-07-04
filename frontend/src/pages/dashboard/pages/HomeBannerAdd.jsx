import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { RiSave3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export default function HomeBannerAdd() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

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
        if (!formData.name.trim()) newErrors.name = "Banner title is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // TODO: API call هنا لما الباك يخلص
        console.log("Form Data to send:", formData);
    };

    const handleCancel = () => {
        setFormData({ name: "", description: "", image: null });
        setImagePreview(null);
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

                        {/* Title */}
                        <label className="block mb-4">
                            <h4 className="text-zinc-500 mb-2 text-[16px] font-semibold">Banner Title *</h4>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter banner title"
                                className="bg-[#F5F5F5] p-2 w-full h-9 rounded-lg focus:outline-gray-200"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </label>

                        {/* Description */}
                        <label className="block">
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

                    {/* ── Right Section ── */}
                    <div className="flex flex-col w-[35%] gap-4">

                        {/* Image Upload */}
                        <div className="bg-white p-5 border-gray-200 border-2 rounded-2xl">
                            <h3 className="text-zinc-600 text-[22px] font-medium mb-4">Banner Image</h3>
                            <div className="border-dashed border-2 border-gray-200 p-5 rounded-xl text-center">
                                <label className="cursor-pointer block">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Banner preview"
                                            className="mx-auto mb-3 max-h-32 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <FiUpload className="mx-auto text-5xl text-gray-400 mb-3" />
                                    )}
                                    <span className="text-gray-600 font-medium">
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