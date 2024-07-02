import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";

export interface Order {
  _id: string;
  username: string;
  totalPrice: number;
  products: [
    {
      productId: {
        name: string;
        price: number;
        _id: string;
      };
      quantity: number;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

const fetchOrders = async () => {
  const { data } = await http.get("/orders");
  return data;
};

export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ["getAllProducts"],
    queryFn: fetchOrders,
  });
};
