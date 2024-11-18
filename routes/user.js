const express = require("express");
const { handleSignupUser, loginUser } = require("../controllers/user");

const router = express.Router();

// User signup and login routes
router.post("/signup", handleSignupUser);
router.post("/login", loginUser);

module.exports = router;
