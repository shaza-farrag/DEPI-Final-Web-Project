import React from "react";
import styles from "./about.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function About() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.hero}></div>

      <div className={styles.section}>
        <h2>HOW IT ALL STARTED</h2>

        <p>
          We are six passionate girls who decided to create something meaningful
          together. Our journey started with a simple idea — supporting
          women-led startup brands and giving them a space to shine. We wanted
          to build a platform where every girl can find everything she needs in
          one place, while also empowering small businesses to grow and reach
          more people. Today, we’re proud to turn that vision into reality,
          creating a community built on creativity, ambition, and support.
        </p>

        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noreferrer"
          className={styles.button}
        >
          Contact Us
        </a>
      </div>

      <div className={styles.shopSection + " " + styles.scroll}>
        <h1>SHOP THE LATEST</h1>
      </div>

      <div className={styles.reviewSection + " " + styles.scroll}>
        <div className={styles.reviewCard}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faQuoteRight}
            rotation={180}
            size="2xl"
            style={{ color: "rgb(225, 182, 182)" }}
          />

          <p>
            "Absolutely love this platform! I found amazing local brands and the
            quality exceeded my expectations. Such a beautiful idea supporting
            women!"
          </p>
          <span> Sarah</span>
        </div>
      </div>

      <div className={styles.lastSection + " " + styles.scroll}>
        <div className={styles.textSide}>
          <h2>WE CAN'T WAIT TO SERVE YOU !</h2>

          <p>
            Discover unique products, support inspiring women-led brands, and
            enjoy a seamless shopping experience made just for you. We bring
            everything you love into one place with care and passion.
          </p>

          <button className={styles.shopBtn} onClick={() => navigate("/")} >
            Shop Now!
          </button>
        </div>

        <div className={styles.imageSide}></div>
      </div>
    </div>
  );
}

export default About;
