import React from "react";
import styles from "../verifyEmail/Verify.module.css";

function CheckResetEmail() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Check Your Email 📩</h2>
        <p>
          We've sent you a password reset link.
          Please check your inbox and click the link to reset your password.
        </p>
      </div>
    </div>
  );
}

export default CheckResetEmail;