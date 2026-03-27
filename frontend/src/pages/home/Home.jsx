import React from 'react'
import styles from './Home.module.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <div>Home</div>
      <Footer />
    </div>
  )
}

export default Home