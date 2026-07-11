import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../services/cart.service";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export const useIncreaseQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: increaseQuantity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export const useDecreaseQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: decreaseQuantity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};