<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry - Arafah Agro & Trade</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f6;
      color: #1f2937;
      line-height: 1.6;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #1e7145 0%, #22c55e 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .header p {
      font-size: 16px;
      opacity: 0.95;
      font-weight: 500;
    }

    /* Logo / Brand */
    .brand {
      text-align: center;
      padding: 30px 30px 20px;
      background-color: #f9fafb;
      border-bottom: 2px solid #e5e7eb;
    }

    .brand h2 {
      font-size: 24px;
      color: #1e7145;
      margin-bottom: 5px;
    }

    .brand p {
      font-size: 13px;
      color: #6b7280;
      font-weight: 500;
      letter-spacing: 1px;
    }

    /* Content */
    .content {
      padding: 40px 30px;
    }

    .section {
      margin-bottom: 30px;
    }

    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #1e7145;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
    }

    .section-title::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: #22c55e;
      border-radius: 50%;
      margin-right: 12px;
    }

    /* Info Box */
    .info-box {
      background-color: #f9fafb;
      border-left: 4px solid #22c55e;
      padding: 16px 20px;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 14px;
    }

    .info-row:last-child {
      margin-bottom: 0;
    }

    .info-label {
      font-weight: 700;
      color: #1e7145;
      font-size: 13px;
      min-width: 110px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-value {
      color: #374151;
      font-size: 14px;
      flex: 1;
      word-break: break-word;
      text-align: right;
    }

    .info-value a {
      color: #22c55e;
      text-decoration: none;
      font-weight: 600;
    }

    .info-value a:hover {
      text-decoration: underline;
    }

    /* Products Section */
    .products-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .product-badge {
      background: linear-gradient(135deg, #22c55e 0%, #1e7145 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      display: inline-block;
      white-space: nowrap;
    }

    /* Message Box */
    .message-box {
      background-color: #f0fdf4;
      border: 2px solid #dcfce7;
      border-radius: 8px;
      padding: 20px;
      color: #166534;
      font-size: 14px;
      line-height: 1.8;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* CTA Section */
    .cta-section {
      text-align: center;
      margin: 30px 0;
      padding: 25px;
      background: linear-gradient(135deg, #f0fdf4 0%, #f9fafb 100%);
      border-radius: 8px;
      border-left: 4px solid #22c55e;
    }

    .cta-section p {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 15px;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #22c55e 0%, #1e7145 100%);
      color: white;
      padding: 12px 32px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
    }

    /* Divider */
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 25px 0;
    }

    /* Footer */
    .footer {
      background-color: #1f2937;
      color: #d1d5db;
      padding: 30px;
      text-align: center;
      font-size: 13px;
      line-height: 1.8;
    }

    .footer h3 {
      color: #f3f4f6;
      font-size: 16px;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .footer p {
      margin-bottom: 8px;
    }

    .footer a {
      color: #22c55e;
      text-decoration: none;
      font-weight: 600;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .footer-divider {
      height: 1px;
      background-color: #4b5563;
      margin: 15px 0;
    }

    .social-links {
      margin-top: 15px;
    }

    .social-links a {
      display: inline-block;
      margin: 0 8px;
      font-size: 12px;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .container {
        border-radius: 0;
      }

      .header {
        padding: 30px 20px;
      }

      .header h1 {
        font-size: 24px;
      }

      .content {
        padding: 25px 20px;
      }

      .info-box {
        padding: 12px 16px;
      }

      .info-row {
        flex-direction: column;
      }

      .info-value {
        text-align: left;
        margin-top: 4px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📬 New Inquiry Received</h1>
      <p>A potential customer is interested in your products</p>
    </div>

    <!-- Brand Section -->
    <div class="brand">
      <h2>Arafah Agro & Trade</h2>
      <p>INTERNATIONAL COMMODITY TRADING</p>
    </div>

    <!-- Main Content -->
    <div class="content">
      <!-- Contact Information -->
      <div class="section">
        <div class="section-title">Contact Information</div>
        <div class="info-box">
          <div class="info-row">
            <span class="info-label">Name</span>
            <span class="info-value">{{ $name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Company</span>
            <span class="info-value">{{ $company }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">
              <a href="mailto:{{ $email }}">{{ $email }}</a>
            </span>
          </div>
          <div class="info-row">
            <span class="info-label">Phone</span>
            <span class="info-value">{{ $phone }}</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Products Section -->
      <div class="section">
        <div class="section-title">Interested Products</div>
        <div class="products-container">
          @if(is_array($products))
            @foreach($products as $product)
              <span class="product-badge">{{ trim($product) }}</span>
            @endforeach
          @else
            @foreach(explode(', ', $products) as $product)
              <span class="product-badge">{{ trim($product) }}</span>
            @endforeach
          @endif
        </div>
      </div>

      <div class="divider"></div>

      <!-- Message Section -->
      <div class="section">
        <div class="section-title">Message & Specifications</div>
        <div class="message-box">{{ $message }}</div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <p><strong>Next Step:</strong> Reply to this inquiry or contact the customer directly.</p>
        <a href="mailto:{{ $email }}?subject=Re: Inquiry from {{ $name }}" class="cta-button">
          📧 Reply to {{ $name }}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <h3>🌾 Arafah Agro & Trade</h3>
      <p>International Commodity Trading Platform</p>
      <p>Specializing in Premium Indonesian Commodities</p>
      <div class="footer-divider"></div>
      <p>
        <strong>Commodities:</strong><br>
        Briquettes • Spices • Coffee • Agricultural Products
      </p>
      <div class="footer-divider"></div>
      <p style="font-size: 12px; opacity: 0.8;">
        This email was sent from your Arafah contact form.<br>
        Please do not reply to this address.
      </p>
      <div class="social-links">
        <a href="#">Website</a> • <a href="#">Contact</a> • <a href="#">Products</a>
      </div>
    </div>
  </div>
</body>

</html>