import { Product } from "@/actions/products/getAllProducts";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/layouts/loader";

interface ProductProps {
  product?: Product;
  guestCartChange: (change: boolean ) => void;
  isLoading: boolean;
}

const ProductDetails = ({
  product,
  guestCartChange,
  isLoading,
}: ProductProps) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [cartChange, setCartChange] = useState(false);

  // increment quantity
  const incrementQuantity = () => {
    const currentQuantity = productQuantity;

    if (product && currentQuantity < product.stock) {
      setProductQuantity(productQuantity + 1);
    }
  };

  // decrement quantity
  const decrementQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  // add to cart
  const addCart = (productId: string | undefined) => {
    if (!product) {
      return;
    }
    guestCartChange(cartChange);
    setCartChange(!cartChange);
    const guestCartString = localStorage.getItem("guestCart");
    const guestCart = guestCartString ? JSON.parse(guestCartString) : [];
    const existingCartItem = guestCart.find(
      (item: any) => item?.productId == productId
    );

    if (existingCartItem) {
      if (existingCartItem.quantity + productQuantity <= product.stock) {
        const updatedQuantity = existingCartItem.quantity + productQuantity;
        const updatedGuestCart = guestCart.map((item: any) =>
          item.productId === productId
            ? { ...item, quantity: updatedQuantity }
            : item
        );
        localStorage.setItem("guestCart", JSON.stringify(updatedGuestCart));
        toast.success("item added to cart");
      } else {
        toast.error("item out of stock");
      }
    } else {
      guestCart.push({
        _id: guestCart.length + 1,
        productId,
        image: product.images[0].url,
        name: product.name,
        stock: product.stock,
        price: product.price,
        quantity: productQuantity,
      });

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      toast.success("item added to cart");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="lg:flex md:flex mx-auto mt-24">
          <div className="lg:w-1/2 md:w-1/2 flex justify-center items-center mb-6">
            <div className="carousel rounded-box lg:w-96 md:w-96 w-64">
              {product &&
                product.images.map((image) => (
                  <div className="carousel-item w-full" key={image.publicId}>
                    <img
                      src={image.url}
                      className="w-full object-cover"
                      alt={product.name}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="lg:w-1/2 md:w-1/2 p-6 h-fit bg-white shadow-xl rounded-lg">
            <h1 className="text-4xl font-extrabold text-primary mb-4">
              {product && product.name}
            </h1>
            <hr className="border-t-2 border-gray-200 mb-4" />
            <p className="text-base text-gray-600 mb-4">
              {product && product.description}
            </p>
            <div className="mb-4">
              <p className="text-lg font-semibold">Quantity:</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => decrementQuantity()}
                  className="mr-2 btn btn-square btn-secondary btn-md"
                >
                  -
                </button>
                <p className="font-medium text-xl mx-2">{productQuantity}</p>
                <button
                  onClick={() => incrementQuantity()}
                  className="ml-2 btn btn-square btn-secondary btn-md"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-xl text-gray-900 font-bold mb-6">
              Price: ${product && product.price}
            </p>
            <button
              className="btn btn-warning w-full"
              type="button"
              onClick={() => addCart(product?._id)}
              disabled={product && productQuantity > product?.stock}
            >
              {product && productQuantity > product?.stock
                ? "Out of stock"
                : "Add to cart"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
