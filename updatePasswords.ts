import bcrypt from "bcryptjs";
import prisma from './lib/db'; // Ensure this path is correct

const updatePasswords = async () => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users

    for (const user of users) {
      if (!user.password.startsWith("$2a$")) { // Only hash if it's not already hashed
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await prisma.user.update({
          where: { id: user.id }, // Ensure you use the correct primary key
          data: { password: hashedPassword },
        });

        console.log(`Updated password for user: ${user.email}`);
      }
    }

    console.log("All passwords updated successfully!");
  } catch (error) {
    console.error("Error updating passwords:", error);
  } finally {
    await prisma.$disconnect();
  }
};

updatePasswords();
