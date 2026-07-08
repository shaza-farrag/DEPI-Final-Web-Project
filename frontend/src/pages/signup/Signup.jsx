import React from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logoWhite from '../../assets/logoWhite.png'
import { useState } from "react";
import { SignupApi } from "../../services/auth.service";

function Signup() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  try {
    await SignupApi({
      firstName,
      lastName,
      email,
      password,
      role: "user",
    });

    navigate("/verifyEmail");
  } catch (err) {
    setError(
      err.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <div className={styles.signup}>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <h1>
          <Link to="/" className={styles.logo}>
            <img src={logoWhite} alt="logo" width="80" />
          </Link>
        </h1>

        <h2>Create account</h2>
        <p>Sign up to get started</p>

        <input
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          maxLength="15"
          minLength="8"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          /> agree to the <Link to="/terms">Terms and Conditions</Link>
        </label>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button type="submit">Create Account</button>

        <p>Already have an account?</p>
        <Link to="/login">Login</Link>

      </form>
    </div>
  )
}

export default Signup