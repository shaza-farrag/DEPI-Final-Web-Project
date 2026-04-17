const User = require("../models/user.model");
const loggerEvent = require("../services/logger.service");
const logger = loggerEvent("auth");
const crypto = require("crypto");
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
                    ...data,
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
}

module.exports = userController;