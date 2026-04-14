import React from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../login/logo.webp'


function Signup() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/verifyEmail')
  }

  return (
    <div className={styles.signup}>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" width="80" />
          </Link>
        </h1>

        <h2>Create account</h2>
        <p>Sign up to get started</p>

        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <label>
          <input type="checkbox" required />
          I agree to terms
        </label>

        <button type="submit">Create Account</button>

        <p>Already have an account?</p>
        <Link to="/login">Login</Link>

      </form>
    </div>
  )
}

export default Signup