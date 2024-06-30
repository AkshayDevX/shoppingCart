"use client"

import useGetLoginUserQuery from "@/actions/user/getLoginUser";

export default function AdminDashboard() {
  const { data } = useGetLoginUserQuery();

  return (
    <div className="mt-7">
      <h1 className="text-3xl font-bold text-center">Welcome Admin</h1>
    </div>
  );
}
