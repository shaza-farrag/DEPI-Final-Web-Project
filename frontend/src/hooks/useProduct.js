import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/product.service";
import { getProducts } from "../services/product.service";

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts(),
  });
};