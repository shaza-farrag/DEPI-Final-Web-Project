import React, { useState } from "react";
import styles from "./faq.module.css";
import heroFaq from "../../assets/heroFaq.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How can I place an order?",
      answer:
        "Browse your favorite brands, add the products you love to your cart, then proceed to checkout and complete your payment.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping usually takes between 2-5 business days depending on your location.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order has been shipped, you'll receive a tracking link via email.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Credit Cards, Debit Cards, Cash on Delivery, and other secure online payment methods.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Of course! You can request a return within our return period as long as the item is unused and in its original condition.",
    },
    {
      question: "I forgot my password. What should I do?",
      answer:
        "Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      {/* Hero */}

      <div className={styles.hero}>
        <img src={heroFaq} alt="FAQ Hero" />

        <div className={styles.overlay}>
          <h1>Frequently Asked Questions</h1>

          <p>Everything you need to know about shopping with Sherwit.</p>
        </div>
      </div>

      {/* FAQ */}

      <div className={styles.faqSection}>
        <h2>HOW CAN WE HELP YOU?</h2>

        {faqData.map((item, index) => (
          <div className={styles.faqCard} key={index}>
            <div className={styles.question} onClick={() => toggleFAQ(index)}>
              <span>{item.question}</span>

              <FontAwesomeIcon
                icon={activeIndex === index ? faChevronUp : faChevronDown}
              />
            </div>

            {activeIndex === index && (
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Last Section */}

      <div className={styles.helpSection}>
        <div className={styles.helpCard}>
          <h2>Still Have Questions?</h2>

          <p>
            Can't find the answer you're looking for? Our support team is always
            here to help you.
          </p>

          <Link to="/contact" className={styles.contactBtn}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
