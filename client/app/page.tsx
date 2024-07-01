"use client"
import { useProductsQuery } from "@/actions/products/getAllProducts";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import ProductCard from "@/components/products/productCard";

export default function Home() {
  const { data: products } = useProductsQuery();
  return (
    <div>
      <Header />
      <ProductCard products={products} />
      <Footer />
    </div>
  );
}
