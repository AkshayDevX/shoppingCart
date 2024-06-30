import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Product } from "./getAllProducts";

const fetchProduct = async (id: string) => {
  const { data } = await http.get(`/products/${id}`);
  return data;
};

export const useGetSingleProductQuery = (id: string) => {
  return useQuery<Product>({
    queryKey: ["getAllProducts"],
    queryFn: () => fetchProduct(id),
  });
};
