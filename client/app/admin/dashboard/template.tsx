"use client"
import AdminHeader from "@/components/admin/layouts/adminHeader";
import AdminSidebar from "@/components/admin/layouts/adminSidebar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminSidebar />
      <div className="w-full px-14 lg:pl-80 md:pl-64 mb-10">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
