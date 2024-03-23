"use client";
import { Card } from "./ui/card";
import { useState } from "react";

export const ApproveOnrampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: "Success" | "Processing" | "Failure";
    provider: string;
    token: string;
    userId: number;
  }[];
}) => {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleCheckboxChange = (token: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(token) ? prev.filter((t) => t !== token) : [...prev, token]
    );
  };

  const handleSendRequest = async () => {
    setIsProcessing(true);
    let success = true;

    for (const token of selectedTransactions) {
      const transaction = transactions.find((t) => t.token === token);
      if (transaction) {
        try {
          const response = await fetch("http://localhost:3003/hdfcWebhook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: transaction.token,
              user_identifier: transaction.userId,
              amount: transaction.amount,
            }),
          });

          if (response.ok) {
            setStatusMessage("Transaction successfully approved!");
          } else {
            setStatusMessage("Failed to approve the transaction.");
            success = false;
          }
        } catch (error) {
          console.error("Error:", error);
          setStatusMessage("Error while processing the transaction.");
          success = false;
        }
      }
    }

    setIsProcessing(false);

    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

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
            <div
              key={t.token}
              className="flex justify-between items-center text-gray-300 border-b border-gray-700 py-4"
            >
              <input
                type="checkbox"
                checked={selectedTransactions.includes(t.token)}
                onChange={() => handleCheckboxChange(t.token)}
                className="bg-gray-800 border-gray-600 text-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-3"
              />
              <div
                style={{
                  flexBasis: "40%",
                  textAlign: "left",
                  marginLeft: "1rem",
                }}
              >
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
              <div
                style={{ flexBasis: "20%", textAlign: "right" }}
                className="text-green-400"
              >
                + Rs {t.amount / 100}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSendRequest}
          className={`mt-6 px-6 py-3 rounded-md text-white ${isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Approve Selected Transactions"}
        </button>

        {statusMessage && (
          <div className="mt-4 text-center">
            <p
              className={
                statusMessage.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {statusMessage}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
