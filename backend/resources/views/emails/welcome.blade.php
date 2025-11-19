<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Arafah</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      background-color: #4CAF50;
      color: white;
      padding: 20px;
      text-align: center;
    }

    .content {
      padding: 20px;
      border: 1px solid #ddd;
    }

    .footer {
      background-color: #f5f5f5;
      padding: 10px;
      text-align: center;
      font-size: 12px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Arafah!</h1>
    </div>
    <div class="content">
      <p>Hello {{ $name }},</p>
      <p>Thank you for joining Arafah! We're excited to have you on board.</p>
      <p>Your email: <strong>{{ $email }}</strong></p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>The Arafah Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Arafah. All rights reserved.</p>
    </div>
  </div>
</body>

</html>