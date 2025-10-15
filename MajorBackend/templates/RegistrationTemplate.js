function RegistrationTemplate(userName,otp) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Registration Successful - Laptop Dekhoo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { margin:0; padding:0; background:#f4f6f8; font-family: 'Poppins', sans-serif; }
    table { border-spacing:0; width:100%; }
    img { display:block; max-width:100%; border:0; }
    .container { max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; }

    /* Header */
    .header { 
      background: linear-gradient(135deg, #36aab9, #14565E); 
      padding:20px; 
      text-align:center; 
      color:#fff; 
    }
    .header h1 { 
      margin:0; 
      font-size:24px; 
      font-weight:700; 
    }

    /* Content */
    .content { padding:24px; }
    .content h2 { 
      font-size:22px; 
      margin-top:0; 
      font-weight:700; 
      background: linear-gradient(90deg, #facc15, #f97316, #ef4444);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .content p { font-size:14px; color:#444b55; line-height:1.6; margin:12px 0; }

    /* Button */
    .button { 
      display:inline-block; 
      padding:12px 20px; 
      background: linear-gradient(135deg, #237B87, #42C2FF); 
      color:#fff; 
      text-decoration:none; 
      border-radius:6px; 
      font-weight:600; 
      margin-top:16px; 
      transition: all 0.3s ease;
    }
    .button:hover {
      background: linear-gradient(135deg, #36aab9, #14565E);
    }

    /* Footer */
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
              <h2>Welcome, ${userName} 🎉</h2>
              <p>Thank you for registering with <strong>Laptop Dekhoo</strong>. Your account has been successfully created.</p>
              <p>You can now explore our wide range of laptops, compare models, and grab the best deals we offer.</p>
              <p>Please verify your email address to activate your account using below otp-:</p>
              
              <!-- Call-to-action -->
              <p class="button">${otp}</p>

              <p style="margin-top:24px;">If the button above does not work, copy and paste the link below into your browser:</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              You received this email because you registered on <strong>Laptop Dekhoo</strong>.<br>
              If you didn’t create an account, you can safely ignore this email.<br><br>
              © 2025 Laptop Dekhoo. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

module.exports = RegistrationTemplate;