/*import React from 'react'
import { createContext} from "react";
export const CartContext = createContext({});

import "react-bootstrap/dist/css/bootstrap.min.css"

function Cart_overlay() {
  return (
    <div>Cart_overlay</div>
  )
}

export default Cart_overlay*/

import React from "react";
import {
  useCart,
  useIncreaseQuantity,
  useDecreaseQuantity,
  useRemoveFromCart,
} from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import CartItem from "./Cartitem.jsx";
import FormatCurrency from "./FormatCurrency";
import styles from "./Shopping_Cart.module.css";
import { useShoppingCart } from "../../context/ShoppingCartContext";

const Shopping_Cart = ({ isOpen }) => {

  const navigate = useNavigate();
  const goToLogin = () => {
    closeCart();
    navigate("/login");
  }
  const { closeCart } = useShoppingCart();

  const { data, isLoading } = useCart();

  const { mutate: increaseQuantity } =
    useIncreaseQuantity();

  const { mutate: decreaseQuantity } =
    useDecreaseQuantity();

  const { mutate: removeFromCart } =
    useRemoveFromCart();

  const cartItems = data?.data?.items ?? [];

  const total = data?.data?.total ?? 0;

  if (isLoading) {
  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={closeCart}
        />
      )}

      <div
        className={`${styles.panel} ${
          isOpen ? styles.panelOpen : ""
        }`}
      >
        <p className="text-center py-5">
          Loading...
        </p>
      </div>
    </>
  );
}

  return (
    <>
      {/* Overlay خلفية شفافة */}
      {isOpen && <div className={styles.overlay} onClick={closeCart} />}

      {/* Panel */}
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>

        {/* Header */}
        <div className={styles.header}>
          <h5 className={styles.title}>Cart</h5>
          <button className={styles.closeBtn} onClick={closeCart}>
            &times;
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyMsg}>
              <p className={styles.emptyText}>Your cart is empty</p>
              <button className={styles.continueBtn} onClick={closeCart}>
                Continue Shopping
              </button>
              <p className={styles.havacc}>Have an account?</p>
              <p className={styles.log}><a className={styles.loglnk} onClick={goToLogin}>Log in </a>to check out faster.</p>

            </div>
          ) : (
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>{FormatCurrency(total)}</span>
            </div>
            <p className={styles.taxNote}>Shipping & taxes calculated at checkout</p>
            <button
              className={styles.checkoutBtn}
              onClick={() => {
                closeCart();
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default Shopping_Cart;