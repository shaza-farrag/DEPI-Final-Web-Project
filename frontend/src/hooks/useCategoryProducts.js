import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../services/product.service";

export const useCategoryProducts = (categoryId) => {
  return useQuery({
    queryKey: ["category-products", categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId,
  });
};