import React from "react";
import styles from "./Verify.module.css";

function Verify() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Check Your Email 📩</h2>
        <p>
          We’ve sent a verified link to your email. Please check your
          inbox and follow the instructions.
        </p>
      </div>
    </div>
  );
}

export default Verify;
