import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

    if (!email) {
        setError("Please enter your email");
        return;
    }

    if (email === "test@gmail.com") {
        setError("");
        navigate("/resetPassword"); 
    } else {
        setError("Email not found ");
    }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h2>Forgot Password</h2>
            <p>Enter your Email and Check Box</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button}>
                Next
            </button>
            </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
