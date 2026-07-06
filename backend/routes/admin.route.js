const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.control");

router.post("/login", (req, res) => {
    authController.login(req, res, "admin");
});

module.exports = router;