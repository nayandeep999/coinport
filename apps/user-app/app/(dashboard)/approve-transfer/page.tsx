import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { ApproveOnrampTransactions } from "../../../src/components/ApproveOnrampTransactions";
import { BalanceCard } from "../../../src/components/BalanceCard";
import { authOptions } from "../../lib/auth";

export const dynamic = "force-dynamic"
async function getOnRampTransactions() {
  try {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id),
        status: "Processing",
      },
    });
    return txns.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
      token: t.token, // Include token
      userId: t.userId, // Include userId
    }));
  } catch (error) {
    console.error("Error fetching on-ramp transactions:", error);
    throw new Error("Unable to fetch on-ramp transactions at this time.");
  }
}

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

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-extrabold text-indigo-400 mx-3 border-b border-gray-700 mb-2 pb-2">
        Approve Bank Transfers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 sm:auto-rows-fr">
        <div className="w-full">
          <ApproveOnrampTransactions transactions={transactions} />
        </div>
        <div className="w-full">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
      </div>
    </div>
  );
}
