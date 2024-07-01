"use client";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import CartComponent from "@/components/products/cartComponent.tsx";
import { useState } from "react";

export default function Home() {
  const [guestCartChange, setGuestCartChange] = useState(true);
  const handleGuestCartChange = (data: boolean) => {
    setGuestCartChange(data);
  };

  return (
    <div>
      <Header guestCartChange={guestCartChange} />
      <CartComponent guestCartChange={handleGuestCartChange} />
      <Footer />
    </div>
  );
}
