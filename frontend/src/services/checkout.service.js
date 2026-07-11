import api from "./api";

export const createCheckoutSession = async (
  checkoutData
) => {
  const { data } = await api.post(
    "/checkout/create-session",
    checkoutData
  );

  return data;
};