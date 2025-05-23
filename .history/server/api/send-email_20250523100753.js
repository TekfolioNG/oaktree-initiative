import { createError, defineEventHandler } from "h3";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Configure nodemailer with your email provider
    const transporter = nodemailer.createTransport({
      // For Gmail:
      service: "gmail",
      auth: {
        user: "your-email@gmail.com", // Your sending email
        pass: "your-app-password", // Your app password (not your regular password)
      },
      // For other providers, use appropriate config
    });

    // Send mail
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: body.to || "support@oaktreeinitiative.org",
      subject: body.subject || "New Idea Submission",
      text: body.body,
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
