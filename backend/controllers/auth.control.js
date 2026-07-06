const sendResetPasswordEmail = require("../services/resetPassword.service");
const User = require("../models/user.model");
const loggerEvent = require("../services/logger.service");
const logger = loggerEvent("auth");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../services/mail.service");

const userController = {
    newUser : async (req, res) => {
            try {
                logger.info(req.body)
                let data = req.body
                
                let dupliatedEmail = await User.findOne({ email: data.email })
                
                if(dupliatedEmail){
                    return res.status(403).json({ message: "Email already exists" });
                }

                const verificationToken = crypto.randomBytes(32).toString("hex");

                let newUser = new User({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  password: data.password,
                  role: data.role,
                  verificationToken,
                  verificationTokenExpires: Date.now() + 60 * 60 * 1000,
                });

                await newUser.save();

                await sendVerificationEmail(newUser.email, verificationToken);

                res.status(201).json({
                    message: "User created successfully, please verify your email",
                });

            } catch(error) {
            logger.error(error);
                res.status(500).json({
                message: "Error creating user",
                error: error.message,
            });

        }
    },

    verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;

      const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({
          message: "Invalid or expired verification token",
        });
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;

      await user.save();

      res.status(200).json({
        message: "Email verified successfully",
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        message: "Verification failed",
        error: error.message,
      });
    }
  },
    login: async (req, res, role) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      if (!user.isVerified) {
        return res.status(403).json({
          message: "Please verify your email first",
        });
      }

      if (user.role !== role) {
        return res.status(403).json({
          message: "Unauthorized",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      logger.error(error);

      return res.status(500).json({
        message: "Login failed",
        error: error.message,
      });
    }
  },
    forgotPassword: async (req, res) => {
      try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

        await user.save();

        await sendResetPasswordEmail(user.email, resetToken);

        return res.status(200).json({
          message: "Reset password email sent successfully",
        });

      } catch (error) {

        logger.error(error);

        return res.status(500).json({
          message: "Failed to send reset password email",
          error: error.message,
        });

      }
    },
    resetPassword: async (req, res) => {

  try {

    const { token } = req.params;

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {

      return res.status(400).json({
        message: "Passwords do not match",
      });

    }

    const user = await User.findOne({

      resetPasswordToken: token,

      resetPasswordExpires: { $gt: Date.now() },

    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid or expired token",
      });

    }

    user.password = password;

    user.resetPasswordToken = undefined;

    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({

      message: "Password reset successfully",

    });

  } catch (error) {

    logger.error(error);

    return res.status(500).json({

      message: "Password reset failed",

      error: error.message,

    });

  }

},
}

module.exports = userController;