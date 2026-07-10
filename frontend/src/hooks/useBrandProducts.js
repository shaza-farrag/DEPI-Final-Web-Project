import { useQuery } from "@tanstack/react-query";
import { getProductsByBrand } from "../services/product.service";

export const useBrandProducts = (brandId) => {
  return useQuery({
    queryKey: ["brand-products", brandId],
    queryFn: () => getProductsByBrand(brandId),
    enabled: !!brandId,
  });
};