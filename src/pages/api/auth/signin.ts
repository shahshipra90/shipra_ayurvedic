// pages/api/auth/signin.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '@lib/db';  // Ensure this is the correct path to your Prisma client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing email or password' });
    }

    try {
      // Find the user in the database by email
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      // If everything matches, send back a success response
      return res.status(200).json({ success: true, message: 'Login successful', user });
      
    } catch (error) {
      console.error('Error during authentication:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  // If the method is not POST, return a method not allowed error
  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
