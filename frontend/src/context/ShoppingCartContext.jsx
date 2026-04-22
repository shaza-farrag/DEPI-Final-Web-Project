import { createContext, useContext, useEffect, useState } from "react";
import ShoppingCart from "../components/cart_overlay/Shopping_Cart";

const ShoppingCartContext = createContext({});


const STORE_ITEMS = [
  { id: 1, name: "Product 1", price: 10 ,imgUrl:""},
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 20 },
  // أضفي منتجاتك هنا
];

const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

const ShoppingCartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);

  // ✅ بيانات ثابتة مباشرة، مش محتاجة loading أو useEffect للـ API
  const storeItems = STORE_ITEMS;

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id == id)?.quantity || 0;
  };

  const increaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  };

  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id == id)?.quantity == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) =>
          item.id == id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id != id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
        storeItems, // ✅ لسه بتمريها لباقي المكونات زي ما هي
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const useShoppingCart = () => useContext(ShoppingCartContext);