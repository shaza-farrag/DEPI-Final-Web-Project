import api from "./api";

export const getProducts = async (page, limit) => {
  let url = "/products";

  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }

  const { data } = await api.get(url);

  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await api.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await api.patch(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(
    `/products/${id}`
  );

  return data;
};

export const getProductsByCategory = async (categoryId) => {
  const { data } = await api.get(
    `/products/category/${categoryId}`
  );

  return data;
};

export const getProductsByBrand = async (brandId) => {
  const { data } = await api.get(
    `/brands/${brandId}/products`
  );

  return data;
};