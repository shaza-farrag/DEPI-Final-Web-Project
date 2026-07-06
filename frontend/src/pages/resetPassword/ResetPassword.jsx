import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setError("Please fill all fields");
            return;
    }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        alert("Password reset successfu ✔️");

        navigate("/login");
    };


    return (
    <div className={styles.container}>
        <div className={styles.card}>
            <h2>Reset Password</h2>
            <p>Enter your new password</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.input}
                />

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button}>
                    Reset Password
                </button>
            </form>
        </div>
    </div>
    );
}

export default ResetPassword;
