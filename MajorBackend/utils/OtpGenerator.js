

// insatall and  import crypto
const { error } = require("console");
const crypto = require("crypto");

function OtpGenerator() {
    try {
        const otp = crypto.randomInt(100000, 999999);
        return otp

    }
    catch (error) {
        console.error("❌ Error generating OTP:", error.message);
        return null; // Return null if something goes wrong
        
    }
}

module.exports = OtpGenerator;