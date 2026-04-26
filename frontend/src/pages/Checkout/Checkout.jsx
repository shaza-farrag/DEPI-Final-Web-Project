import { useState } from "react";
import styles from "./Checkout.module.css";
import { Search } from 'lucide-react';
import Header from "../../components/header/Header";


const INITIAL_PRODUCTS = [
  { id: 1, name: "Pink and Black Planner", variant: "Default", price: 23, qty: 1, emoji: "📓" },
  { id: 2, name: "Hello There Mug", variant: "White / 11oz", price: 19, qty: 1, emoji: "☕" },
  { id: 3, name: "Flower Scrapbook Journal", variant: "Default", price: 32, qty: 3, emoji: "🌸" },
];


export default function CheckoutPage() {
  const [cart, setCart] = useState(INITIAL_PRODUCTS.map((p) => ({ ...p })));
  const [form, setForm] = useState({
    email: "",
    newsOffers: false,
    country: "United States",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    saveInfo: false,
  });

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const totalQty = cart.reduce((s, p) => s + p.qty, 0);
  const subtotal = cart.reduce((s, p) => s + p.price * p.qty, 0);

  const handleField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <>
    <Header/>
    <div className={styles.fpage}>
    <div className={styles.wrap}>
      <div className={styles.left}>
        
      <div className={styles.inputs}>
        {/* Contact */}
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <a href="/login" className={styles.signIn}>Sign in</a>
        </div >
        
        <input
          className={styles.field}
          type="email"
          name="email"
          placeholder="Email or mobile phone number"
          value={form.email}
          onChange={handleField}
        />
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            name="newsOffers"
            checked={form.newsOffers}
            onChange={handleField}
          />
          <span>Email me with news and offers</span>
        </label>

        <hr className={styles.divider} />

        {/* Delivery */}
        <h2 className={styles.sectionTitle}>Delivery</h2>
        <select
          className={`${styles.field} ${styles.mb10}`}
          name="country"
          value={form.country}
          onChange={handleField}
        >
          <option>United States</option>
          <option>Egypt</option>
          <option>United Kingdom</option>
          <option>Canada</option>
        </select>
        <div className={`${styles.fieldRow} ${styles.mb10}`}>
          <input
            className={styles.field}
            type="text"
            name="firstName"
            placeholder="First name (optional)"
            value={form.firstName}
            onChange={handleField}
          />
          <input
            className={styles.field}
            type="text"
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleField}
          />
        </div>
        <div className={`${styles.addrWrap} ${styles.mb10}`}>
          <input
            className={styles.field}
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleField}
          />
          <span className={styles.addrIcon}>🔍</span>
        </div>
        <input
          className={`${styles.field} ${styles.mb10}`}
          type="text"
          name="apartment"
          placeholder="Apartment, suite, etc. (optional)"
          value={form.apartment}
          onChange={handleField}
        />
        <div className={`${styles.threeCol} ${styles.mb10}`}>
          <input
            className={styles.field}
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleField}
          />
          <select
            className={styles.field}
            name="state"
            value={form.state}
            onChange={handleField}
          >
            <option value="">State</option>
            <option>California</option>
            <option>New York</option>
            <option>Texas</option>
          </select>
          <input
            className={styles.field}
            type="text"
            name="zip"
            placeholder="ZIP code"
            value={form.zip}
            onChange={handleField}
          />
        </div>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            name="saveInfo"
            checked={form.saveInfo}
            onChange={handleField}
          />
          <span>Save this information for next time</span>
        </label>


        <hr className={styles.divider} />

        {/* Shipping method */}
        <h2 className={styles.sectionTitle}>Shipping method</h2>
        <div className={styles.infoBox}>
          Enter your shipping address to view available shipping methods.
        </div>

        <hr className={styles.divider} />

        {/* Payment */}
        <h2 className={styles.sectionTitle}>Payment</h2>
        <p className={styles.payNote}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 6a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1zm0-3a1.25 1.25 0 110 2.5A1.25 1.25 0 018 4z"
              fill="#bbb"
            />
          </svg>
          All transactions are secure and encrypted.
        </p>
        {/*<div className={styles.payBox}>
          <span className={styles.payIcon}>💳</span>
          This store can't accept payments right now.
        </div>*/}

        <button className={styles.btnPay}>Pay now</button>
      </div>
      </div>

      {/* Order summary */}
      <div className={styles.right}>
        {cart.length === 0 ? (
          <p className={styles.emptyCart}>No items in cart</p>
        ) : (
          cart.map((p) => (
            <div className={styles.product} key={p.id}>
              <div className={styles.productImg}>
                <span>{p.emoji}</span>
                <span className={styles.badge}>{p.qty}</span>
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>{p.name}</div>
                <div className={styles.productVariant}>{p.variant}</div>
                <div className={styles.qtyCtrl}>
                  <button className={styles.qtyBtn} onClick={() => changeQty(p.id, -1)}>−</button>
                  <span className={styles.qtyNum}>{p.qty}</span>
                  <button className={styles.qtyBtn} onClick={() => changeQty(p.id, 1)}>+</button>
                  <button className={styles.removeBtn} onClick={() => removeItem(p.id)}>Remove</button>
                </div>
              </div>
              <div className={styles.productPrice}>${(p.price * p.qty).toFixed(2)}</div>
            </div>
          ))
        )}

        <hr className={styles.divider} />

        <div className={styles.summaryRow}>
          <span>Subtotal · {totalQty} item{totalQty !== 1 ? "s" : ""}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span className={styles.hint}>Enter shipping address</span>
        </div>
        <div className={styles.totalRow}>
          <span>Total</span>
          <span>
            <span className={styles.usd}>USD</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </span>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}