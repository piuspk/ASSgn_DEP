const express = require("express");
const router = new express.Router();
const control = require('../controllers/Controls');





router.post("/user/register", control.register);

router.post("/user/sendotp",control.sendOtp);

router.post("/user/login",control.Loginuser);
router.post("/user/update",control.updateUser);

module.exports = router;