const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.control");
const { newUserValidation } = require("../middlewares/userValidation.middleware");

router.post("/login", (req, res) => {
    res.status(200).json({ message: "Login route" });
});

router.post("/signup", newUserValidation, authController.newUser);

router.get("/verify-email/:token", authController.verifyEmail);

module.exports = router;