import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Verify.module.css";

function Verify() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (value, index, e) => {
    // allow only numbers
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }

    // move back on delete
    if (!value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6) {
      setError("Please enter full OTP");
      return;
    }

    if (enteredOtp === "123456") {
      setError("");
      navigate("/"); // go to home
    } else {
      setError("Wrong OTP ");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Enter OTP</h2>
        <p>please check your email !</p>

        <div className={styles.otpBox}>
          {otp.map((num, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={num}
              onChange={(e) => handleChange(e.target.value, index, e)}
              className={styles.input}
            />
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleSubmit} className={styles.button}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default Verify;
