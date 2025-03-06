import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // Or use SMTP settings for another provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});
