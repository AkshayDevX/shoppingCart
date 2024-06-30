import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import http from "../utils/http";

interface LoginInput {
  username: string;
  password: string;
}

async function login(input: LoginInput) {
  const { data } = await http.post(`/auth/login`, input);
  return data;
}

const useLoginUserMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: (_data, _variables) => {
      toast.success("Login Successful");
      router.push("/admin/dashboard");
    },
    onError: (error: any) => {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};

export default useLoginUserMutation;