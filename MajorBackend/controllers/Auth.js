const User = require("../modals/UserModal.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailSender = require("../utils/EmailSender.js");
const OtpGenerator = require("../utils/OtpGenerator.js");
require("dotenv").config();

/* 
----------------------------------------------------
  ✅ SIGNUP CONTROLLER
----------------------------------------------------
*/
exports.Signup = async (req, res) => {
  console.log("📥 Incoming request in Signup");

  try {
    const { name, email, password, confirm_password, role } = req.body;

    // Step 1: Validation – all fields must be provided
    if (!name || !email || !password || !confirm_password) {
      return res.status(422).json({
        success: false,
        message: "All fields (name, email, password, confirm_password) are required.",
      });
    }

    // Step 2: Check password match
    if (password !== confirm_password) {
      return res.status(422).json({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }

    // Step 3: Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please login instead.",
      });
    }

    // Step 4: Hash password and generate OTP
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = OtpGenerator();

    // Step 5: Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
    });

    // Step 6: Send OTP via email
    await EmailSender(name, email, otp, "Registration Successful");

    res.status(201).json({
      success: true,
      message: "Registration successful! OTP has been sent to your email for verification.",
      data: newUser,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your signup request.",
      error: error.message,
    });
  }
};

/* 
----------------------------------------------------
  ✅ VERIFY ACCOUNT CONTROLLER
----------------------------------------------------
*/
exports.VerifyAccount = async (req, res) => {
  console.log("📥 Incoming request in Verify Account");

  try {
    const { email, otp } = req.body;

    // Step 1: Validation
    if (!email || !otp) {
      return res.status(422).json({
        success: false,
        message: "Email and OTP are required for verification.",
      });
    }

    // Step 2: Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Step 3: Check if already verified
    if (user.verifyStatus) {
      return res.status(400).json({
        success: false,
        message: "Your account is already verified.",
      });
    }

    // Step 4: Validate OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check your email and try again.",
      });
    }

    // Step 5: Update user status
    user.verifyStatus = true;
    user.otp = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Your account has been successfully verified!",
    });
  } catch (error) {
    console.error("❌ Verify error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while verifying your account.",
      error: error.message,
    });
  }
};

/* 
----------------------------------------------------
  ✅ LOGIN CONTROLLER
----------------------------------------------------
*/
exports.Login = async (req, res) => {
  console.log("📥 Incoming request in Login");

  try {
    const { email, password } = req.body;

    // Step 1: Validation
    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // Step 2: Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please signup first.",
      });
    }

    // Step 3: Check if verified
    if (!user.verifyStatus) {
      return res.status(403).json({
        success: false,
        message: "Please verify your account before login. Check your email for OTP.",
      });
    }

    // Step 4: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Step 5: Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Step 6: Set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: true });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging in.",
      error: error.message,
    });
  }
};

/* 
----------------------------------------------------
  ✅ FORGOT PASSWORD - SEND OTP
----------------------------------------------------
*/
exports.ForgotPasswordSendOtp = async (req, res) => {
  console.log("📥 Incoming request in ForgotPasswordSendOtp");

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({
        success: false,
        message: "Email is required to send OTP.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email.",
      });
    }

    const otp = OtpGenerator();
    user.otp = otp;
    await user.save();

    await EmailSender(user.name, email, otp, "Password Reset OTP", "forgot");

    res.status(200).json({
      success: true,
      message: "OTP has been sent to your registered email address.",
    });
  } catch (error) {
    console.error("❌ ForgotPasswordSendOtp error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to send OTP. Please try again later.",
      error: error.message,
    });
  }
};

/* 
----------------------------------------------------
  ✅ RESET PASSWORD
----------------------------------------------------
*/
exports.ForgotPassword = async (req, res) => {
  console.log("📥 Incoming request in Reset Password");

  try {
    const { email, otp, new_password, confirm_password } = req.body;

    // Step 1: Validation
    if (!email || !otp || !new_password || !confirm_password) {
      return res.status(422).json({
        success: false,
        message: "All fields (email, otp, new_password, confirm_password) are required.",
      });
    }

    // Step 2: Check password match
    if (new_password !== confirm_password) {
      return res.status(422).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    // Step 3: Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your email and try again.",
      });
    }

    // Step 4: Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check your email and try again.",
      });
    }

    // Step 5: Update password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    await user.save();

    await EmailSender(user.name, email, otp, "Password Reset Successful", "success");

    res.status(200).json({
      success: true,
      message: "Your password has been reset successfully!",
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while resetting password.",
      error: error.message,
    });
  }
};

/* 
----------------------------------------------------
  ✅ LOGOUT CONTROLLER
----------------------------------------------------
*/
exports.Logout = async (req, res) => {
  try {
      console.log("📥 Incoming request in Logout");

    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "You have been logged out successfully.",
    });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging out.",
      error: error.message,
    });
  }
};

/* 
----------------------------------------------------
  ✅ FETCH ALL USERS (Admin or Debug)
----------------------------------------------------
*/
exports.AllUserData = async (req, res) => {
  try {
    const data = await User.find();

    if (data.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No users found in the database.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched all user records successfully.",
      data,
    });
  } catch (error) {
    console.error("❌ AllUserData error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch user data. Please try again later.",
      error: error.message,
    });
  }
};
