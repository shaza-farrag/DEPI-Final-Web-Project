import React from 'react'
import { useState } from "react"
import styles from './Login.module.css'
import { Link, useNavigate } from "react-router-dom"
import logoWhite from "../../assets/logoWhite.png"
import { LoginApi } from "../../services/auth.service";
import { UseAuth } from "../../context/AuthContext";


function Login() {
  const navigate = useNavigate()
  const { login } = UseAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

 const handleLogin = async (e) => {
  e.preventDefault();

  setError("");

  try {
    const response = await LoginApi({
      email,
      password,
    });

    login(
      response.data.user,
      response.data.token
    );

    navigate("/");
  } catch (err) {
    setError(
      err.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleLogin} >
        <h1 className={styles.logo}>
          <Link to="/">
            <img src={logoWhite} alt="logo" width="80"  />
          </Link>
        </h1>

        <h2>Sign in</h2>
        <p>Sign in or create a new account</p>

        <input type="email" placeholder="Email" required  value={email}
        onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Password" required value={password}
        onChange={(e) => setPassword(e.target.value)} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* <label><input type='checkbox' />Remember me</label> */}
        <Link to="/forgotPassword">Forgot Passward?</Link>
        
        <button type="submit" className={styles.subbtn}>Sign in</button>

          <p>Don't have an account ?</p>
          <button onClick={() => navigate('/signup')} className={styles.regbtn}>
            Register
          </button>
      </form>

    </div>
  )
}

export default Login