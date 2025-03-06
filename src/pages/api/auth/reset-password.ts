// pages/api/auth/reset-password.ts
import { prisma } from "@lib/prisma";
import { transporter } from "@lib/mail";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a default password
    const defaultPassword = "YourNewDefault123"; // Change this if needed
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // ✅ Update user's password in the database FIRST
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log("✅ Password updated in the database");

    // ✅ Now send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset - Your Default Password",
      text: `Your new password is: ${defaultPassword}\n\nUse this password to log in and change it if necessary.`,
    });

    console.log("📧 Email sent successfully");

    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("❌ Error resetting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
