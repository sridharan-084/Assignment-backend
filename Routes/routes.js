const express = require("express");
const router = express.Router();
const UserSignup = require("../Controller/Register");
const payment = require("../Controller/Payment");
const Login = require("../Controller/Login");
const details = require("../Controller/details");
const Cancel = require("../Controller/cancel");

router.post("/signup", UserSignup);
router.post("/login", Login);
router.post("/payment", payment);
router.post("/details", details);
router.post("/cancelsub", Cancel);

module.exports = router;
