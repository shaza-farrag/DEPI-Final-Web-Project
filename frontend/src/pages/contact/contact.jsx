
import styles from "./Contact.module.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles.hero}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Feel free to contact us anytime.</p>
      </div>

      <div className={styles.container}>
        {/* Contact Info */}
        <div className={styles.info}>
          <div className={styles.card}>
            <FaPhoneAlt />
            <div>
              <h3>Phone</h3>
              <p>+20 101 234 5678</p>
            </div>
          </div>

          <div className={styles.card}>
            <FaEnvelope />
            <div>
              <h3>Email</h3>
              <p>support@sherwit.com</p>
            </div>
          </div>

          <div className={styles.card}>
            <FaMapMarkerAlt />
            <div>
              <h3>Address</h3>
              <p>Cairo, Egypt</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className={styles.form}>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Subject" />
          <textarea rows="5" placeholder="Write your message..." />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact