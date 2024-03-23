import { Card } from "./ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: "Success" | "Processing" | "Failure";
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card className="p-6 border-gray-700 h-full">
        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-xl font-bold text-gray-300">
            Recent Transactions
          </h1>
          <hr className="border-gray-700 mb-2" />
          <p className="text-md font-medium text-gray-400">
            No Recent Transactions
          </p>
        </div>
      </Card>
    );
  }
  return (
    <Card className="p-6 border-gray-700 h-full">
      <div className="flex flex-col gap-2 mt-2">
        <h1 className="text-xl font-bold text-gray-300">
          Recent Bank Transactions
        </h1>
        <hr className="border-gray-700 mb-2" />
        <div className="w-full">
          {transactions.map((t) => (
            <div className="flex justify-between text-gray-300 border-b border-gray-700 py-2">
              <div style={{ flexBasis: "40%", textAlign: "left" }}>
                <div className="text-sm">Received INR</div>
                <div className="text-gray-400 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div
                className="text-sm"
                style={{ flexBasis: "40%", textAlign: "center" }}
              >
                {t.status}
              </div>
              <div style={{ flexBasis: "20%", textAlign: "right" }} className="text-green-400">
                + Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
