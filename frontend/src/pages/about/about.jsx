import React from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import logoPaige from "../../assets/logoPaige.png";
import heroAbout from "../../assets/heroAbout.jpg.jpeg";
import { HeartHandshake, Truck, ShieldCheck } from "lucide-react";

function About() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img src={heroAbout} />
      </div>

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

        <Link to="/contact" className={styles.button}>
          Contact Us
        </Link>
      </div>

      <section className={styles.sectionWhy}>
        <h2>WHY CHOOSE SHERWIT</h2>

        <p className={styles.subtitle}>
          More than just shopping, Sherwit is a community that empowers
          women-led brands and delivers a smooth shopping experience.
        </p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <HeartHandshake size={42} className={styles.icon} />
            <h3>Support Women</h3>
            <p>
              Every purchase helps talented women-owned businesses grow and
              reach more customers.
            </p>
          </div>

          <div className={styles.card}>
            <Truck size={42} className={styles.icon} />
            <h3>Fast Shopping</h3>
            <p>
              Simple browsing, secure checkout and a seamless shopping journey.
            </p>
          </div>

          <div className={styles.card}>
            <ShieldCheck size={42} className={styles.icon} />
            <h3>Trusted Quality</h3>
            <p>
              Carefully selected products from trusted local brands with premium
              quality.
            </p>
          </div>
        </div>
      </section>

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

          <button className={styles.shopBtn} onClick={() => navigate("/")}>
            Shop Now!
          </button>
        </div>

        <div className={styles.imageSide}>
          <Link to="/">
            <img src={logoPaige} alt="logo" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
