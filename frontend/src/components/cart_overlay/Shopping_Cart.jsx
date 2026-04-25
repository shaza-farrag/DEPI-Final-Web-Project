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
import { useShoppingCart } from "../../context/ShoppingCartContext.jsx";
import { useNavigate } from "react-router-dom";
import CartItem from "./Cartitem.jsx";
import FormatCurrency from "./FormatCurrency";
import styles from "./Shopping_Cart.module.css";

const Shopping_Cart = ({ isOpen }) => {

  const navigate = useNavigate();
  const goToLogin = () => {
    closeCart();
    navigate("/login");
  }
  const { closeCart, cartItems, storeItems } = useShoppingCart();

  const total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

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
                <CartItem key={item.id} {...item} />
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
           <button className={styles.checkoutBtn} onClick={() => navigate("/Checkout")}>
              Checkout
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default Shopping_Cart;