import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../services/category.service";

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],

    queryFn: getMenu,

    staleTime: 1000 * 60 * 60,

    gcTime: 1000 * 60 * 60 * 2,

    refetchOnWindowFocus: false,
  });
};