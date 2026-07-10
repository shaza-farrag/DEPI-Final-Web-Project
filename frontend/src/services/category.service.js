import api from "./api";

export const getCategories = async (page = 1, limit = 10) => {
  const { data } = await api.get(
    `/categories?page=${page}&limit=${limit}`
  );

  return data;
};

export const getCategory = async (id) => {
  const { data } = await api.get(`/categories/${id}`);

  return data;
};

export const createCategory = async (categoryData) => {
  const { data } = await api.post(
    "/categories",
    categoryData
  );

  return data;
};

export const updateCategory = async (id, categoryData) => {
  const { data } = await api.patch(
    `/categories/${id}`,
    categoryData
  );

  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(
    `/categories/${id}`
  );

  return data;
};

export const getBrandsByCategory = async (id) => {
  const { data } = await api.get(
    `/categories/${id}/brands`
  );

  return data;
};

export const getMenu = async () => {
  const { data } = await api.get("/categories/menu");
  return data;
};