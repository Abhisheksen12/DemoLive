const nodemailer = require("nodemailer");
const RegistrationTemplate = require("../templates/RegistrationTemplate.js");
const VerificationSuccessTemplate = require("../templates/VerificationSuccessTemplate.js");
const ForgotPasswordTemplate = require("../templates/ForgotPasswordTemplate.js"); // must be a function
const PasswordChangeSuccessfull = require("../templates/PasswordChangeSuccessfull.js")
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function EmailSender(userName, email, otp, subject, type = "registration") {
  try {
    let htmlContent;

    switch (type) {
      case "registration":
        htmlContent = RegistrationTemplate(userName, otp);
        break;

      case "verify":
        htmlContent = VerificationSuccessTemplate(userName);
        break;

      case "forgot":
        // Here we send the OTP directly in the email
        htmlContent = ForgotPasswordTemplate(userName, otp);
        break;

      case "success":
        // Here we send the OTP directly in the email
        htmlContent = PasswordChangeSuccessfull(userName);
        break;

      default:
        htmlContent = RegistrationTemplate(userName, otp);
    }

    const info = await transporter.sendMail({
      from: `"Laptop Dekhoo 💻" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = EmailSender;
