import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import http from "../utils/http";

interface imageInput {
  id: string;
  publicId: string;
}

async function deleteImage(input: imageInput) {
  const { data } = await http.patch(`/products/${input.id}`, input);
  return data;
}

const useDeleteImageMutation = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: imageInput) => deleteImage(input),
    onSuccess: (_data, _variables) => {
      toast.success("Image deleted successfully");
      queryClient.refetchQueries({ queryKey: ["geSingleProduct"] , exact: true});
    },
    onError: (error: any) => {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useDeleteImageMutation;
