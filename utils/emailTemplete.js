const getEmailVerificationTemplate = (verificationUrl, userEmail, userName = 'there') => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Chat App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-text {
            font-size: 18px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 20px;
        }
        
        .description {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            transition: transform 0.2s ease;
            margin: 20px 0;
        }
        
        .verify-button:hover {
            transform: translateY(-2px);
        }
        
        .alternative-link {
            background-color: #f7fafc;
            border: 2px dashed #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .alternative-link p {
            font-size: 14px;
            color: #718096;
            margin-bottom: 10px;
        }
        
        .alternative-link a {
            color: #667eea;
            word-break: break-all;
            font-size: 12px;
        }
        
        .security-info {
            background-color: #fff5f5;
            border-left: 4px solid #f56565;
            padding: 20px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .security-info h3 {
            font-size: 16px;
            color: #c53030;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        
        .security-info p {
            font-size: 14px;
            color: #742a2a;
        }
        
        .footer {
            background-color: #2d3748;
            color: #a0aec0;
            padding: 30px;
            text-align: center;
        }
        
        .footer-content {
            font-size: 14px;
            line-height: 1.6;
        }
        
        .footer-links {
            margin: 20px 0;
        }
        
        .footer-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 15px;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #a0aec0;
            text-decoration: none;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                box-shadow: none;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .verify-button {
                display: block;
                text-align: center;
                padding: 16px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>🎉 Welcome to Chat App!</h1>
            <p>You're almost ready to start chatting</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <div class="welcome-text">
                Hello ${userName}! 👋
            </div>
            
            <div class="description">
                Thank you for joining Chat App! We're excited to have you as part of our community. To get started and ensure the security of your account, please verify your email address by clicking the button below.
            </div>
            
            <!-- Verify Button -->
            <div style="text-align: center;">
                <a href="${verificationUrl}" class="verify-button">
                    ✉️ Verify My Email Address
                </a>
            </div>
            
            <!-- Alternative Link -->
            <div class="alternative-link">
                <p><strong>Button not working?</strong> Copy and paste this link into your browser:</p>
                <a href="${verificationUrl}">${verificationUrl}</a>
            </div>
            
            <!-- Security Information -->
            <div class="security-info">
                <h3>🔒 Security Notice</h3>
                <p>
                    This verification link will expire in <strong>15 minutes</strong> for security purposes. If you didn't create an account with Chat App, please ignore this email or contact our support team.
                </p>
            </div>
            
            <div class="description">
                Once verified, you'll be able to:
                <br><br>
                ✨ Start real-time conversations<br>
                🎯 Join group chats<br>
                🔐 Access all app features securely<br>
                📱 Sync across all your devices
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <strong>Chat App Team</strong><br>
                Making conversations better, one message at a time.
                
                <div class="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Support</a>
                </div>
                
                <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                    This email was sent to ${userEmail} because you created an account on Chat App.
                    <br>© 2025 Chat App. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

module.exports= getEmailVerificationTemplate;