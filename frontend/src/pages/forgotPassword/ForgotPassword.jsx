import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { ForgotPasswordApi } from "../../services/auth.service";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
        setError("Please enter your email");
        return;
    }

    setError("");

    try {
        await ForgotPasswordApi(email);

        navigate("/checkResetEmail");
    } catch (err) {
        setError(
        err.response?.data?.message || "Something went wrong"
        );
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
