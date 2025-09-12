const nodemailer = require("nodemailer");

// Gmail configuration for Railway
const createTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
