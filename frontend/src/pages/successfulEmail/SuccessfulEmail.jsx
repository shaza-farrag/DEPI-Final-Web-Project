import React from "react";
import styles from "./SuccessfulEmail.module.css";
import { useNavigate } from "react-router-dom";


function SuccessfulEmail() {
    
    const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Your email verified successfully !</h2>
        <button className={styles.subbtn} onClick={() => navigate("/login")}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessfulEmail;