import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

async function logout() {
  await axios.get("http://localhost:8000/auth/logout", {
    withCredentials: true,
  });
}

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/admin");
      queryClient.resetQueries({ queryKey: ["loginUser"], exact: true });
      toast.success("Logged out successfully");
    },
  });
};

export default useLogoutMutation;
