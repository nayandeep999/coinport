import { Card } from "./ui/card";

export const P2pTransactionCard = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    direction: "Sent" | "Received";
    user: {
      id: number;
      name: string;
    };
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card className="p-6 border-gray-700 h-full">
        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-xl font-bold text-gray-300">
            Recent P2P Transactions
          </h1>
          <hr className="border-gray-700 mb-2" />
          <p className="text-md font-medium text-muted-foreground">
            No Recent P2P Transactions
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-gray-700 h-full">
      <div className="flex flex-col gap-2 mt-2">
        <h1 className="text-xl font-bold text-gray-300">Recent P2P Transactions</h1>
        <hr className="border-gray-700 mb-2" />
        <div className="w-full">
          {transactions.map((t, index) => (
            <div key={index} className="flex items-center text-gray-300 border-b border-gray-700 py-2">
              <div style={{ flexBasis: "40%", textAlign: "left" }}>
                <div className="text-sm">{t.direction === "Received" ? "Received" : "Sent"} INR</div>
                <div className="text-gray-400 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div style={{ flexBasis: "40%", textAlign: "center" }}>
                <span className="text-sm">{t.user.name}</span>
              </div>
              <div style={{ flexBasis: "20%", textAlign: "right" }}>
                {t.direction === "Received" ? (
                  <span className="text-green-400">+ Rs {t.amount / 100}</span>
                ) : (
                  <span className="text-red-400">- Rs {t.amount / 100}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
