const express = require("express");
const {
  userRegistration,
  userLogin,
  verifyOtp,
} = require("../controllers/userController");

const router = express.Router();
router.post("/user/userRegistration", userRegistration);
router.post("/user/userLogin", userLogin);
router.post("/user/verifyOtp", verifyOtp);

module.exports = router;
