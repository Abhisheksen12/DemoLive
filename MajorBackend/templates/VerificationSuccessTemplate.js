function VerificationSuccessTemplate(userName) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Email Verified - Laptop Dekhoo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { margin:0; padding:0; background:#f4f6f8; font-family: 'Poppins', sans-serif; }
    table { border-spacing:0; width:100%; }
    img { display:block; max-width:100%; border:0; }
    .container { max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; }

    .header { background:linear-gradient(135deg,#36aab9,#14565E); padding:20px; text-align:center; color:#fff; }
    .header h1 { margin:0; font-size:24px; font-weight:700; }

    .content { padding:24px; text-align:center; }
    .content h2 { font-size:22px; font-weight:700; background:linear-gradient(90deg,#22c55e,#16a34a,#15803d);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .content p { font-size:14px; color:#444b55; line-height:1.6; margin:12px 0; }

    .button { display:inline-block; padding:12px 20px; background:linear-gradient(135deg,#237B87,#42C2FF);
      color:#fff; text-decoration:none; border-radius:6px; font-weight:600; margin-top:16px; transition:all 0.3s ease; }
    .button:hover { background:linear-gradient(135deg,#36aab9,#14565E); }

    .footer { padding:16px 24px; font-size:12px; color:#94a0aa; background:#f7fafc; text-align:center; }
  </style>
</head>
<body>
  <table role="presentation" width="100%" bgcolor="#f4f6f8">
    <tr>
      <td align="center">
        <table role="presentation" class="container">
          <tr>
            <td class="header"><h1>Laptop Dekhoo</h1></td>
          </tr>

          <tr>
            <td class="content">
              <h2>Verification Successful ✅</h2>
              <p>Hi <strong>${userName}</strong>, your email has been successfully verified.</p>
              <p>Welcome aboard! You can now access all features, explore laptops, compare models, and find the best deals.</p>
              <a href="https://laptopdekho.com/login" class="button">Go to Dashboard</a>
            </td>
          </tr>

          <tr>
            <td class="footer">
              © 2025 Laptop Dekhoo. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
module.exports = VerificationSuccessTemplate;
