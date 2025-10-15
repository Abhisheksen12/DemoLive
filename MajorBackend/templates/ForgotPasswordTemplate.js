function ForgotPasswordTemplate(userName, otp) {
return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Forgot Password - Laptop Dekhoo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { margin:0; padding:0; background:#f4f6f8; font-family: 'Poppins', sans-serif; }
    table { border-spacing:0; width:100%; }
    .container { max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; }

    .header { 
      background: linear-gradient(135deg, #36aab9, #14565E); 
      padding:20px; 
      text-align:center; 
      color:#fff; 
    }
    .header h1 { margin:0; font-size:24px; font-weight:700; }

    .content { padding:24px; }
    .content h2 { 
      font-size:22px; margin-top:0; font-weight:700; 
      background: linear-gradient(90deg, #facc15, #f97316, #ef4444);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .content p { font-size:14px; color:#444b55; line-height:1.6; margin:12px 0; }

    .otp-box { 
      display:inline-block; 
      padding:12px 20px; 
      background: linear-gradient(135deg, #237B87, #42C2FF); 
      color:#fff; 
      text-decoration:none; 
      border-radius:6px; 
      font-weight:600; 
      margin-top:16px; 
      font-size:18px;
      letter-spacing:2px;
    }

    .footer { 
      padding:16px 24px; 
      font-size:12px; 
      color:#94a0aa; 
      background:#f7fafc; 
      text-align:center; 
    }

    @media only screen and (max-width:520px) {
      .content { padding:16px; }
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" bgcolor="#f4f6f8">
    <tr>
      <td align="center">
        <table role="presentation" class="container">
          
          <!-- Header -->
          <tr>
            <td class="header">
              <h1>Laptop Dekhoo</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content">
              <h2>Password Reset Request 🔐</h2>
              <p>Hi ${userName},</p>
              <p>We received a request to reset your Laptop Dekhoo account password. Please use the OTP below to reset your password:</p>
              
              <p class="otp-box">${otp}</p>

              <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
              <p>If you didn’t request a password reset, kindly ignore this email — your account is safe.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              © 2025 Laptop Dekhoo. All rights reserved.<br>
              Need help? <a href="mailto:support@laptopdekhoo.com" style="color:#237B87; text-decoration:none;">Contact Support</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

}

module.exports = ForgotPasswordTemplate;
