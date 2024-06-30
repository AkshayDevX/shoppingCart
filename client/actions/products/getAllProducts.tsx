import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";

export interface Product {
  _id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: [
    {
      publicId: string;
      url: string;
    }
  ];
}

const fetchProducts = async () => {
  const { data } = await http.get("/products");
  return data;
};

export const useProductsQuery = () => {
  return useQuery<Product[]>({
    queryKey: ["getAllProducts"],
    queryFn: fetchProducts,
  });
};
