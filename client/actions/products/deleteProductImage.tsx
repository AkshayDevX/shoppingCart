import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries({ queryKey: [`geSingleProduct${variables.id}`] , exact: true});
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      // toast.error("Failed to delete image");
    },
  });
};

export default useDeleteImageMutation;
