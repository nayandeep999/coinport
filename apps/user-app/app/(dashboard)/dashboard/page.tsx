import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransactionCard } from "../../../src/components/P2pTransactionCard"; // Adjust the path accordingly
import { OnRampTransactions } from "@/components/OnRampTransactions";
import { BalanceCard } from "@/components/BalanceCard";

async function getBalance() {
  try {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    };
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw new Error("Unable to fetch balance at this time.");
  }
}

interface P2PTransaction {
  time: Date;
  amount: number;
  direction: "Sent" | "Received";
  user: {
    id: number;
    name: string;
  };
}

// Function to fetch P2P transactions (both sent and received)
async function getP2PTransfers(): Promise<P2PTransaction[]> {
  try {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId) throw new Error("User not authenticated.");

    const txns = await prisma.p2pTransfer.findMany({
      where: {
        OR: [
          { fromUserId: userId }, // Transactions where the user sent money
          { toUserId: userId }, // Transactions where the user received money
        ],
      },
      include: {
        fromUser: true, // Include sender details
        toUser: true, // Include receiver details
      },
    });

    return txns.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      direction:
        t.fromUserId === userId ? "Sent" : ("Received" as "Sent" | "Received"), // Explicitly assert type here
      user: {
        id: t.fromUserId === userId ? t.toUser.id : t.fromUser.id,
        name:
          t.fromUserId === userId
            ? t.toUser.name || "Unknown User"
            : t.fromUser.name || "Unknown User",
      },
    }));
  } catch (error) {
    console.error("Error fetching P2P transfers:", error);
    throw new Error("Unable to fetch P2P transfers at this time.");
  }
}

async function getOnRampTransactions() {
  try {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return txns.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));
  } catch (error) {
    console.error("Error fetching Bank transfers:", error);
    throw new Error("Unable to fetch Bank transfers at this time.");
  }
}

// Function to render the transactions page
export default async function TransactionsPage() {
  const balance = await getBalance();
  const p2ptransactions = await getP2PTransfers();
  const banktransactions = await getOnRampTransactions();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-extrabold text-indigo-400 mx-3 border-b border-gray-700 mb-2 pb-2">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
        <div className="w-full">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
        <div className="w-full">
          <P2pTransactionCard transactions={p2ptransactions} />
        </div>
        <div className="w-full">
          <OnRampTransactions transactions={banktransactions} />
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic"