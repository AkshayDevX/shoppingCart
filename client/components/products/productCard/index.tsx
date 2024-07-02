import { Product } from "@/actions/products/getAllProducts";
import Loading from "@/components/layouts/loader";
import Link from "next/link";

interface ProductsProps {
  products?: Product[];
  isLoading?: boolean;
}

const ProductCard = ({ products, isLoading }: ProductsProps) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center mt-24">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {products &&
              products.map((product, index) => (
                <Link key={index} href={`/product/${btoa(product._id)}`}>
                  <div className="card bg-base-100 w-72 shadow-xl">
                    <figure>
                      <img
                        className="h-56 w-full object-cover"
                        src={product?.images[0]?.url || ""}
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{product.name}</h2>
                      <p>{product.description}</p>
                      <p>
                        Price:{" "}
                        <span className="font-bold">${product.price}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
