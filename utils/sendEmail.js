const nodemailer = require("nodemailer");

// Gmail configuration for Railway
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password, not regular password
    },
    tls: {
      rejectUnauthorized: false, // Important for Railway
    },
    // Connection timeout settings
    connectionTimeout: 60000, // 1 minute
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 1 minute
    // Pool settings for better performance
    pool: true,
    maxConnections: 5,
    maxMessages: 10,
  });
};

const sendEmail = async (to, subject, html) => {
  const transporter = createTransporter();

  try {
    console.log("Creating email transporter...");

    // Verify connection configuration
    await transporter.verify();
    console.log("✅ SMTP server connection verified");

    const mailOptions = {
      from: {
        name: "Chat App Team",
        address: process.env.EMAIL_USER,
      },
      to,
      subject,
      html,
      // Add some headers for better deliverability
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    };

    // Send email with timeout protection
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Email timeout after 30 seconds")),
          30000
        )
      ),
    ]);

    console.log("✅ Email sent successfully:", info.messageId);
    console.log("📧 Email preview URL:", nodemailer.getTestMessageUrl(info));

    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    console.error("❌ Email sending failed:", error);

    // Provide specific error messages
    if (error.code === "EAUTH") {
      throw new Error("Gmail authentication failed. Check your app password.");
    } else if (error.code === "ECONNECTION") {
      throw new Error("Cannot connect to Gmail servers. Network issue.");
    } else if (error.code === "ETIMEDOUT") {
      throw new Error("Email sending timed out. Try again later.");
    } else {
      throw new Error(`Email error: ${error.message}`);
    }
  } finally {
    // Close the transporter
    transporter.close();
  }
};

// Test email function
const testEmailConnection = async () => {
  const transporter = createTransporter();
  try {
    await transporter.verify();
    console.log("✅ Email service is ready");
    return true;
  } catch (error) {
    console.error("❌ Email service failed:", error.message);
    return false;
  } finally {
    transporter.close();
  }
};

module.exports = {
  sendEmail,
  testEmailConnection,
};
