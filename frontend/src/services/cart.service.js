import api from "./api";

export const addToCart = async ({
  productId,
  quantity,
}) => {
  const { data } = await api.post("/cart", {
    productId,
    quantity,
  });

  return data;
};

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

export const increaseQuantity = async (productId) => {
  const { data } = await api.patch(
    `/cart/increase/${productId}`
  );

  return data;
};

export const decreaseQuantity = async (productId) => {
  const { data } = await api.patch(
    `/cart/decrease/${productId}`
  );

  return data;
};

export const removeFromCart = async (productId) => {
  const { data } = await api.delete(
    `/cart/${productId}`
  );

  return data;
};