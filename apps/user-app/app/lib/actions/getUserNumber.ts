"use server"
import { getServerSession } from "next-auth"; // Adjust import according to your setup
import prisma from "@repo/db/client";
import { authOptions } from "../auth"; // Adjust according to your authentication setup

export async function getUserNumber() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        number: true, // Fetch only the user number
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.number; // Return the user's number
  } catch (error) {
    console.error("Error fetching user number:", error);
    throw error; // Propagate the error if needed
  }
}
