const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `http://localhost:5000/api/auth/verify-email/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #fff7f7; padding: 40px 20px; text-align: center;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08);">
          <div style="background: #dfb6b6; padding: 30px; color: #ffffff;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Our Sherwit ✨</h1>
            <p style="margin-top: 10px; font-size: 16px;">Elegant fashion, curated just for you</p>
          </div>

          <div style="padding: 40px 30px; color: #444; line-height: 1.8;">
            <h2 style="margin-top: 0; color: #dfb6b6;">Verify Your Email 💌</h2>
            <p>
              We’re so happy to have you join our fashion community 🛍️💖
              Verify your email to start exploring our latest collections,
              exclusive offers, and your personalized wishlist.
            </p>

            <a href="${verifyUrl}" style="display:inline-block; margin-top:20px; padding:14px 28px; background:#dfb6b6; color:#fff; text-decoration:none; border-radius:8px; font-weight:bold;">
              Verify My Account
            </a>

            <p style="margin-top: 30px; font-size: 14px; color: #777;">
              If you didn’t create this account, you can safely ignore this email.
            </p>
          </div>

          <div style="background:#faf1f1; padding:20px; font-size:12px; color:#999;">
            © 2026 Sherwit — Style made with love 🤍
          </div>
        </div>
      </div>
    `
  });
};

module.exports = sendVerificationEmail;