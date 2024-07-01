import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utils/http";
import { useRouter } from "next/navigation";

export interface ProductInput {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images?: File[];
}
async function updateProduct(input: ProductInput) {
  const formData = new FormData();
  input.images?.forEach((image) => {
    formData.append("files", image);
  });
  formData.append("name", input.name);
  formData.append("description", input.description);
  formData.append("price", input.price.toString());
  formData.append("stock", input.stock.toString());
  const { data } = await http.patch(`/products/update/${input.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

const useUpdateProductMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ProductInput) => updateProduct(input),
    onSuccess: (_data, _variables) => {
      toast.success("product update successfully");
      router.push("/admin/dashboard/products");
      queryClient.refetchQueries({ queryKey: ["getAllProducts"], exact: true })
    },
    onError: (error: any) => {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useUpdateProductMutation;
