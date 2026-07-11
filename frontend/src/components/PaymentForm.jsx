import { useState } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } =
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout`,
        },
        redirect: "if_required",
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
  // نستنى الـ webhook يخلص إنشاء الأوردر وحذف الكارت
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await queryClient.refetchQueries({
    queryKey: ["cart"],
  });

  alert("Payment Successful");

  navigate("/");
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "15px",
          color: "white",
          border: "none",
          cursor: "pointer",
          background: "#c4717a"
        }}
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
}

export default function PaymentForm({ clientSecret }) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}