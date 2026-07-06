const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `http://localhost:5173/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #fff7f7; padding:40px 20px; text-align:center;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 14px rgba(0,0,0,.08);">

          <div style="background:#dfb6b6; padding:30px; color:#fff;">
            <h1>Forgot Your Password?</h1>
            <p>Don't worry, we've got you 💖</p>
          </div>

          <div style="padding:40px 30px; color:#444; line-height:1.8;">

            <p>
              We received a request to reset your password.
            </p>

            <a href="${resetUrl}"
               style="display:inline-block;
               margin-top:20px;
               padding:14px 28px;
               background:#dfb6b6;
               color:#fff;
               text-decoration:none;
               border-radius:8px;
               font-weight:bold;">
               Reset Password
            </a>

            <p style="margin-top:30px;font-size:14px;color:#777;">
              This link will expire in 1 hour.
            </p>

            <p style="font-size:14px;color:#777;">
              If you didn't request this, simply ignore this email.
            </p>

          </div>

          <div style="background:#faf1f1;padding:20px;font-size:12px;color:#999;">
            © 2026 Sherwit — Style made with love 🤍
          </div>

        </div>
      </div>
    `,
  });
};

module.exports = sendResetPasswordEmail;