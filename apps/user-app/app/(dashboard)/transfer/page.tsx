import prisma from "@repo/db/client";
import { AddMoney } from "../../../src/components/AddMoneyCard";
import { BalanceCard } from "../../../src/components/BalanceCard";
import { OnRampTransactions } from "../../../src/components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export const dynamic = "force-dynamic"
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
    console.error("Error fetching on-ramp transactions:", error);
    throw new Error("Unable to fetch on-ramp transactions at this time.");
  }
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-extrabold text-indigo-400 mx-3 border-b border-gray-700 mb-2 pb-2">
        Transfer
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
        <div className="w-full">
          <AddMoney />
        </div>
        <div className="w-full">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
        <div className="w-full">
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
