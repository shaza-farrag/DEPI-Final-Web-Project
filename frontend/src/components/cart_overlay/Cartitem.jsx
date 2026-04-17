import React from "react";
import styles from "./CartItem.module.css";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import FormatCurrency from "./FormatCurrency";

const CartItem = ({ id, quantity }) => {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, storeItems = [] } = useShoppingCart();

  const item = storeItems.find((i) => i.id === id);

  if (!item) return null;

  return (
    <div className={styles.cartItem}>
      <img
        src={item.imgUrl}
        alt={item.name}
        className={styles.image}
      />

      <div className={styles.details}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>{FormatCurrency(item.price)}</p>

        <div className={styles.quantityControls}>
          <button className={styles.qtyBtn} onClick={() => decreaseCartQuantity(id)}>−</button>
          <span className={styles.qtyNum}>{quantity}</span>
          <button className={styles.qtyBtn} onClick={() => increaseCartQuantity(id)}>+</button>
        </div>
      </div>

      <div className={styles.rightSide}>
        <p className={styles.total}>{FormatCurrency(item.price * quantity)}</p>
        <button className={styles.removeBtn} onClick={() => removeFromCart(id)}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default CartItem;