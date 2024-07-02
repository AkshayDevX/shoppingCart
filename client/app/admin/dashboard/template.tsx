"use client";
import AdminHeader from "@/components/admin/layouts/adminHeader";
import AdminSidebar from "@/components/admin/layouts/adminSidebar";
import { getUserFromToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/layouts/loader";
import useGetLoginUserQuery from "@/actions/user/getLoginUser";

export default function Template({ children }: { children: React.ReactNode }) {
  const { data, isPending: loading } = useGetLoginUserQuery();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const token = Cookies.get("token");
      if (token) {
        const user = await getUserFromToken(token);
        if (user && user.role === "admin") {
        } else {
          router.replace("/admin");
        }
      } else {
        router.replace("/admin");
      }
    }
    checkAuth();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <AdminSidebar />
          <div className="w-full px-14 lg:pl-80 md:pl-64 mb-10">
            <AdminHeader user={data} />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
