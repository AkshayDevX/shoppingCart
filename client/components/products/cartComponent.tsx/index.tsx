import useCreateOrderMutation from '@/actions/orders/createOrder';
import { useProductsQuery } from '@/actions/products/getAllProducts';
import Popup from '@/components/orders/placeOrderPopup';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
};

interface CartProps {
    guestCartChange: (change: boolean ) => void;
}

const CartComponent = ({guestCartChange}: CartProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { data: products} = useProductsQuery();
  const [cartChange, setCartChange] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { mutate: createOrder, isPending } = useCreateOrderMutation();

  // get cart from local storage
  useEffect(() => {
    const cartString = localStorage.getItem('guestCart');
    const savedCart: CartItem[] = cartString ? JSON.parse(cartString) : [];
    setCart(savedCart);
  }, []);

  // update cart in local storage
  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('guestCart', JSON.stringify(updatedCart));
  };

  // increment quantity
  const incrementQuantity = (productId: string) => {
    const product = products?.find(product => product._id === productId);

    if (!product) {
      return;
    }

    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity < product.stock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updatedCart);
    guestCartChange(cartChange);
    setCartChange(!cartChange);
  };

  // decrement quantity
  const decrementQuantity = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
    guestCartChange(cartChange);
    setCartChange(!cartChange);
  };

  // remove item from cart
  const removeItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    updateCart(updatedCart);
    guestCartChange(cartChange);
    setCartChange(!cartChange);
    toast.success('Item removed from cart');
  };

  // calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // confirm and place order
  const handleConfirmOrder = (name: string) => {
   const cartProducts = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    const outOfStockProducts = cartProducts.filter(cartProduct => {
      const product = products?.find(product => product._id === cartProduct.productId);
      return product ? cartProduct.quantity > product.stock : true;
    });
  
    if ( outOfStockProducts.length > 0) {
      toast.error('Some products are out of stock');
      return;
    }
    createOrder({
        username: name,
        products: cartProducts,
        totalPrice: totalPrice,
    })
  };

  return (
    <div className="container mx-auto max-w-prose mt-24 p-4">
      <h1 className="text-2xl font-extrabold text-primary mb-6">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center bg-white shadow-lg rounded-lg p-4">
              <img src={item.image || ""} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decrementQuantity(item.productId)}
                    className="btn btn-secondary btn-square btn-sm"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.productId)}
                    className="btn btn-secondary btn-square btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <p>{products && (item.quantity > (products?.find(product => product._id === item.productId)?.stock || 0) ? 'Out of stock' : '')}</p>
              <div className="ml-4">
                <button onClick={() => removeItem(item.productId)} className="btn btn-error btn-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
            <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <button disabled={isPending} className="btn btn-warning w-full mt-4" type='button' onClick={() => setShowPopup(true)}>Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <p className="text-xl">Your cart is empty.</p>
      )}
       {showPopup && <Popup onClose={() => setShowPopup(false)} onConfirm={handleConfirmOrder} />}
    </div>
  );
};

export default CartComponent;
