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
  const [cartChange, setCartChange] = useState(false);


  useEffect(() => {
    const cartString = localStorage.getItem('guestCart');
    const savedCart: CartItem[] = cartString ? JSON.parse(cartString) : [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('guestCart', JSON.stringify(updatedCart));
  };

  const incrementQuantity = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity < item.stock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updatedCart);
    guestCartChange(cartChange);
    setCartChange(!cartChange);
  };

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

  const removeItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    updateCart(updatedCart);
    guestCartChange(cartChange);
    setCartChange(!cartChange);
    toast.success('Item removed from cart');
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto max-w-prose mt-24 p-4">
      <h1 className="text-2xl font-extrabold text-primary mb-6">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center bg-white shadow-lg rounded-lg p-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
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
              <div className="ml-4">
                <button onClick={() => removeItem(item.productId)} className="btn btn-error btn-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
            <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <button className="btn btn-warning w-full mt-4">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <p className="text-xl">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartComponent;
