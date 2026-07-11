import { useMutation } from "@tanstack/react-query";

import { createCheckoutSession } from "../services/checkout.service";

export const useCheckout = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
};