import React from "react";
import styles from "./CartItem.module.css";
import FormatCurrency from "./FormatCurrency";

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  const product = item.product;

  if (!product) return null;

  return (
    <div className={styles.cartItem}>
      <img
        src={product.image?.url}
        alt={product.name}
        className={styles.image}
      />

      <div className={styles.details}>
        <p className={styles.name}>
          {product.name}
        </p>

        <p className={styles.price}>
          {FormatCurrency(product.price)}
        </p>

        <div className={styles.quantityControls}>
          <button
            className={styles.qtyBtn}
            onClick={() =>
              decreaseQuantity(product._id)
            }
          >
            −
          </button>

          <span className={styles.qtyNum}>
            {item.quantity}
          </span>

          <button
            className={styles.qtyBtn}
            disabled={item.quantity >= product.stock}
            onClick={() =>
              increaseQuantity(product._id)
            }
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.rightSide}>
        <p className={styles.total}>
          {FormatCurrency(
            product.price * item.quantity
          )}
        </p>

        <button
          className={styles.removeBtn}
          onClick={() =>
            removeFromCart(product._id)
          }
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CartItem;