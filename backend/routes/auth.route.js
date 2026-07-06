const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.control");
const { newUserValidation } = require("../middlewares/userValidation.middleware");

router.post("/signup", newUserValidation, authController.newUser);

router.post("/login", (req, res) => {
    authController.login(req, res, "user");
});

router.get("/verify-email/:token", authController.verifyEmail);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;