"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    // Error if the user is not authenticated
    if (!from) {
      return {
        success: false,
        message: "Error: User not authenticated",
      };
    }

    // Check for valid transfer amount
    if (amount <= 0) {
      return {
        success: false,
        message: "Error: Invalid transfer amount",
      };
    }

    // Check if the recipient user exists
    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });

    if (!toUser) {
      return {
        success: false,
        message: "Error: Recipient user not found",
      };
    }

    // Transaction to handle balance transfer
    await prisma.$transaction(async (tx) => {
      // Lock sender's balance with FOR UPDATE to prevent race conditions
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      // Check if sender has sufficient balance
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error('Insufficient funds');
      }

      // Deduct amount from sender's balance
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      // Add amount to recipient's balance
      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // Log the P2P transfer
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    // Return success if the transaction completes
    return {
      success: true,
      message: "Transfer successful",
    };
  } catch (error: any) {
    // Specific error handling for insufficient funds
    if (error.message === 'Insufficient funds') {
      return {
        success: false,
        message: "Error: Insufficient balance for transfer",
      };
    }

    // General error handling for unexpected issues
    return {
      success: false,
      message: `Error: ${error.message || "An unexpected error occurred"}`,
    };
  }
}
