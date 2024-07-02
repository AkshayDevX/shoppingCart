import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utils/http";

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: File[];
}

async function addProduct(input: ProductInput) {
    const formData = new FormData();
    input.images.forEach((image) => {
      formData.append("files", image);
    });
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("price", input.price.toString());
    formData.append("stock", input.stock.toString());
  const { data } = await http.post(`/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

const useAddProductMutation = () => {
  return useMutation({
    mutationFn: (input: ProductInput) => addProduct(input),
    onSuccess: (_data, _variables) => {
      toast.success("product added successfully");
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useAddProductMutation;