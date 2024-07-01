import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utils/http";

async function deleteProduct(input: { id: string }) {
  const { data } = await http.delete(`/products/${input.id}`);
  return data;
}

const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => deleteProduct(input),
    onSuccess: (_data, _variables) => {
      toast.success("product deleted successfully");
      queryClient.refetchQueries({ queryKey: ["getAllProducts"], exact: true });
    },
    onError: (error: any) => {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useDeleteProductMutation;
