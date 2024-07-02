"use client";
import { useGetSingleProductQuery } from "@/actions/products/getSingleProduct";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import ProductDetails from "@/components/products/productDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { slug } = useParams();
  const [guestCartChange, setGuestCartChange] = useState(true);
  const { data, isPending, isFetching } = useGetSingleProductQuery(slug as string);
  const handleGuestCartChange = (data: boolean) => {
    setGuestCartChange(data);
  };
  return (
    <div>
      <Header guestCartChange={guestCartChange} />
      <ProductDetails isLoading={isPending || isFetching} guestCartChange={handleGuestCartChange} product={data} />
      <Footer />
    </div>
  );
}
