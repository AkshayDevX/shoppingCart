import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utils/http";
import { useRouter } from "next/navigation";

export interface OrderInput {
  username: string;
  totalPrice: number;
  products: {
    productId: string;
    quantity: number;
  }[];
}

async function createOrder(input: OrderInput) {
  const { data } = await http.post(`/orders`, input);
  return data;
}

const useCreateOrderMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: OrderInput) => createOrder(input),
    onSuccess: (_data, _variables) => {
      toast.success("order placed successfully");
      localStorage.removeItem("guestCart");
      router.push("/");
      queryClient.refetchQueries({ queryKey: ["getAllProducts"], exact: true })
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useCreateOrderMutation;
