import { createError, defineEventHandler } from "h3";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Configure nodemailer for Zoho Mail
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com", // Zoho's SMTP server
      port: 465, // SSL port
      secure: true, // Use SSL
      auth: {
        user: "support@oaktreeinitiative.org", // Your Zoho email address
        pass: "your-zoho-app-password", // Zoho app password (not your regular password)
      },
      // Optional: Add TLS settings
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: '"OakTree Initiative Support" <support@oaktreeinitiative.org>', // Professional sender format
      to: body.to || "support@oaktreeinitiative.org",
      subject: body.subject || "New Idea Submission",
      text: body.text || body.body, // More flexible body handling
      html: body.html || undefined, // Optional HTML content
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email sending error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email",
    });
  }
});
