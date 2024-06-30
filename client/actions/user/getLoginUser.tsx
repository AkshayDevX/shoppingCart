import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";

async function getLoginUser() {
  const { data } = await http.get(`/users/me`);
  return data;
}

const useGetLoginUserQuery = () => {
  return useQuery({
    queryKey: ["loginUser"],
    queryFn: getLoginUser,
  });
};

export default useGetLoginUserQuery;