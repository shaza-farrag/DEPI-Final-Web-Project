import api from "./api";

export const getBanners = async () => {
  const { data } = await api.get("/banners");
  return data;
};

export const getBannerById = async (id) => {
  const { data } = await api.get(`/banners/${id}`);
  return data;
};

export const createBanner = async (bannerData) => {
  const { data } = await api.post("/banners", bannerData);
  return data;
};

export const updateBanner = async (id, bannerData) => {
  const { data } = await api.patch(`/banners/${id}`, bannerData);
  return data;
};

export const deleteBanner = async (id) => {
  const { data } = await api.delete(`/banners/${id}`);
  return data;
};