import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getBanners, deleteBanner } from "../../../services/banner.service";

export default function BannerHomeList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await getBanners();

      // 🔍 اطبع شكل الـ response الحقيقي (شيلها بعد ما تتأكد إنها شغالة)
      console.log("Banners API raw response:", res);

      // نتعامل مع أكتر من شكل محتمل للـ response
      let bannerList = [];

      if (Array.isArray(res)) {
        bannerList = res;
      } else if (Array.isArray(res?.banners)) {
        bannerList = res.banners;
      } else if (Array.isArray(res?.data)) {
        bannerList = res.data;
      } else if (Array.isArray(res?.data?.banners)) {
        bannerList = res.data.banners;
      } else if (Array.isArray(res?.data?.data?.banners)) {
        bannerList = res.data.data.banners;
      } else if (Array.isArray(res?.data?.data)) {
        bannerList = res.data.data;
      }

      if (bannerList.length === 0) {
        console.warn(
          "لم يتم العثور على مصفوفة بانرات في الـ response. تحقق من الشكل في الـ console أعلاه."
        );
      }

      setBanners(bannerList);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  function handleEdit(id) {
    navigate(`/dashboard/homeslider/edit/${id}`);
  }

  async function confirmDelete(id) {
    try {
      await deleteBanner(id);
      setBanners((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="relative overflow-x-auto bg-white my-5 shadow-md rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-600">Banner Home List</h1>
        <button
          onClick={() => navigate("/dashboard/homeslider/add")}
          className="font-medium w-35 absolute right-4 py-2 leading-5 bg-[#D797C6] text-white
         rounded-md cursor-pointer hover:bg-[#B6679F]
        "
        >
          <span className="text-[20px]">+</span> Add Banner
        </button>
      </div>

      {/* الجدول */}
      <div className="rounded-md! shadow-md! border border-[rgba(0,0,0,0.1)] overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse">
          <thead>
            <tr className="bg-[#F8ECEC]!">
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Banner ID
              </th>
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Image
              </th>
              <th className="font-bold! text-[#7a7171]! text-left px-4 py-3">
                Description
              </th>
              <th className="font-bold! text-[#7a7171]! text-center px-4 py-3">
                Offer
              </th>
              <th className="font-bold! text-[#7a7171]! text-center px-4 py-3">
                Products
              </th>

              <th className="font-bold! text-[#7a7171]! text-right px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>

            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && banners.map((banner) => (
              <tr
                key={banner._id}
                className="hover:bg-[#F8ECEC]! transition-all border-b border-[rgba(0,0,0,0.06)]"
              >
                <td className="font-medium! text-gray-500! px-4 py-3">
                  #{banner._id}
                </td>
                <td className="px-4 py-3">
                  {banner.products?.[0]?.image?.url ? (
                    <img
                      src={banner.products[0].image.url}
                      alt={banner.description}
                      className="w-24 h-12 object-cover rounded-md border border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-12 rounded-md bg-gray-100 border border-gray-200" />
                  )}
                </td>
                <td className="font-medium! px-4 py-3">{banner.description}</td>
                <td className="text-center px-4 py-3">{banner.offer}</td>
                <td className="font-semibold! text-center px-4 py-3">
                  {banner.products?.length || 0}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(banner._id)}
                      aria-label="Edit banner"
                      className="p-2 rounded-md text-[#7a7171] hover:text-[#D797C6] hover:bg-[#F8ECEC]! transition-colors cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(banner._id)}
                      aria-label="Delete banner"
                      className="p-2 rounded-md text-[#7a7171] hover:text-red-500 hover:bg-[#F8ECEC]! transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && banners.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                 No Banners Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteTarget !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-xl p-9 w-90 shadow-lg text-center!">
            <h2 className=" font-semibold text-2xl mb-2">Delete Banner</h2>
            <p className="text-gray-500 text-sm mb-5">
             Are you sure to delete this Banner ?
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