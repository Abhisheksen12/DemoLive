const express = require("express");
const router = express.Router();
// const AuthController = require("../controllers/AuthController.js");


// const { Signup, Login, AllUserData ,Logout} = require("../controllers/Auth.js");
// const  CheckLoginStatus = require("../middleware/CheckLoginStatus");

const { Signup, Login, VerifyAccount, 
    ForgotPasswordSendOtp, ForgotPassword, Logout } = require("../controllers/Auth.js")






// ------------------- Signup -------------------
router.post("/signup", Signup);

// ------------------- Verify Account -------------------
router.post("/verify-account", VerifyAccount);

// // ------------------- Login -------------------
router.post("/login", Login);

// // ------------------- Forgot Password OTP -------------------
router.post("/forgot-password-otp", ForgotPasswordSendOtp);


// // ------------------- Reset Password -------------------
router.post("/reset-password", ForgotPassword);

// // ------------------- Logout -------------------
router.post("/logout", Logout);

// // ------------------- All Users -------------------
// router.get("/all-users", CheckLoginStatus("admin"),AuthController.AllUserData);

module.exports = router;
