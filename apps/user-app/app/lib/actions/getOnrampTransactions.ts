"use server";
import { getServerSession } from "next-auth"; // Adjust import according to your setup
import prisma from "@repo/db/client";
import { authOptions } from "../auth"; // Adjust according to your authentication setup

export async function getOnrampTransactions() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const onRampTransactions = await prisma.onRampTransaction.findMany({
      where: {
        status: "Processing", // Use the exact value from the OnRampStatus enum
      },
    });

    return onRampTransactions; // Return the user's number
  } catch (error) {
    console.error("Error fetching user number:", error);
    throw error; // Propagate the error if needed
  }
}
