import api from "./api";

export const getBrands = async (page = 1, limit = 10) => {
  const { data } = await api.get(
    `/brands?page=${page}&limit=${limit}`
  );

  return data;
};

export const getBrand = async (id) => {
  const { data } = await api.get(`/brands/${id}`);

  return data;
};

export const createBrand = async (brandData) => {
  const { data } = await api.post(
    "/brands",
    brandData
  );

  return data;
};

export const updateBrand = async (id, brandData) => {
  const { data } = await api.patch(
    `/brands/${id}`,
    brandData
  );

  return data;
};

export const deleteBrand = async (id) => {
  const { data } = await api.delete(
    `/brands/${id}`
  );

  return data;
};

export const getProductsByBrand = async (id) => {
  const { data } = await api.get(
    `/brands/${id}/products`
  );

  return data;
};