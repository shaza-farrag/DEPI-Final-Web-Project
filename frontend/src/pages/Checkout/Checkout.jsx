import { useState } from "react";
import styles from "./Checkout.module.css";
import Header from "../../components/header/Header";
import {
  useCart,
  useIncreaseQuantity,
  useDecreaseQuantity,
  useRemoveFromCart,
} from "../../hooks/useCart";
import { useCheckout } from "../../hooks/useCheckout";
import PaymentForm from "../../components/PaymentForm";



export default function CheckoutPage() {

  const [clientSecret, setClientSecret] =
  useState("");

  const {
  mutate: createPaymentIntent,
  isPending,
} = useCheckout();

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

  

  
  const handleCheckout = () => {
  if (
    !form.email ||
    !form.lastName ||
    !form.address ||
    !form.city ||
    !form.country ||
    !form.zip
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  createPaymentIntent(form, {
    onSuccess: (response) => {
      setClientSecret(response.data.clientSecret);
    },
  });
};

  const { data, isLoading } = useCart();

  const { mutate: increaseQuantity } =
    useIncreaseQuantity();

  const { mutate: decreaseQuantity } =
    useDecreaseQuantity();

  const { mutate: removeFromCart } =
    useRemoveFromCart();

  // Normalize quantity so it works whether the API returns
  // `item.quantity` or `item.qty`, and always coerce to a number
  // so price * quantity never produces NaN.
  const cart = (data?.data?.items ?? []).map((item) => ({
    ...item,
    quantity: Number(item.quantity ?? item.qty ?? 0),
  }));


  const totalQty = cart.reduce(
  (s, item) => s + item.quantity,
  0
);

const subtotal = cart.reduce(
  (s, item) =>
    s +
    Number(item.product.price) *
      item.quantity,
  0
);

  const handleField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };


 if (isLoading) {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    </div>
  );
}

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
          {/* <a href="/login" className={styles.signIn}>Sign in</a> */}
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
        <div className={`${styles.fieldRow} ${styles.mb10}`}>
  <input
    className={styles.field}
    type="text"
    name="city"
    placeholder="City"
    value={form.city}
    onChange={handleField}
  />

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

        <button
          className={styles.btnPay}
          onClick={handleCheckout}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Pay now"}
        </button>
        {clientSecret && (
          <div className="mt-6">
            <PaymentForm
              clientSecret={clientSecret}
            />
          </div>    
        )}
      </div>
      </div>

      {/* Order summary */}
      <div className={styles.right}>
        {cart.length === 0 ? (
          <p className={styles.emptyCart}>No items in cart</p>
        ) : (
          cart.map((item) => (
            <div className={styles.product} key={item.product._id}>
              <div className={styles.productImg}>
                <img
                    src={item.product.image.url}
                    alt={item.product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>
                  {item.product.name}
                </div>

                <div className={styles.productVariant}>
                  {item.product.brand?.name}
                </div>

                <div className={styles.qtyCtrl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => decreaseQuantity(item.product._id)}
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>

                  <span className={styles.qtyNum}>{item.quantity}</span>

                  <button
                    className={styles.qtyBtn}
                    onClick={() => increaseQuantity(item.product._id)}
                    disabled={item.quantity >= item.product.stock}
                  >
                    +
                  </button>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className={styles.productPrice}>${(
  Number(item.product.price) *
  item.quantity
).toFixed(2)}</div>
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