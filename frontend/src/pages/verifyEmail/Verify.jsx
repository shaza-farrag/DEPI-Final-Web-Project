import React, { useEffect } from "react";
import styles from "./Verify.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { VerifyEmailApi } from "../../services/auth.service";

function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        await VerifyEmailApi(token);

        navigate("/successfulEmail");
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  if (!token) {
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <h2>Check Your Email 📩</h2>
          <p>
            We've sent a verification link to your email.
            Please check your inbox and click the link to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Verifying your email...</h2>
        <p>Please wait a moment.</p>
      </div>
    </div>
  );
}

export default Verify;