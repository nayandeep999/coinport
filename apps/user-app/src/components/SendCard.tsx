"use client";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../../app/lib/actions/p2pTransfer";
import { Card } from "./ui/card";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  ); // To hold the status message
  const [isLoading, setIsLoading] = useState(false); // To track loading state

  const handleTransfer = async () => {
    setIsLoading(true);
    setTransactionStatus(null); // Clear previous status
    const response = await p2pTransfer(number, Number(amount) * 100);
    setIsLoading(false);

    if (response.success) {
      setTransactionStatus("Transaction successful!");
    } else {
      setTransactionStatus(response.message || "Transaction failed");
    }
  };

  return (
    <Card className="p-6 border-gray-700">
      <div className="flex flex-col gap-2 text-gray-300 mt-2">
        <h1 className="text-xl font-bold text-gray-300">Send</h1>
        <hr className="border-gray-700 mb-2" />
        <TextInput
          placeholder={"Enter the phone number"}
          label="Number"
          onChange={(value) => setNumber(value)}
        />
        <TextInput
          placeholder={"Enter the amount"}
          label="Amount"
          onChange={(value) => setAmount(value)}
        />
        <div className="pt-4 flex justify-center">
          <Button onClick={handleTransfer} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
        {/* Show transaction status */}
        {transactionStatus && (
          <div
            className={`pt-4 text-center ${
              transactionStatus.includes("successful")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {transactionStatus}
          </div>
        )}
      </div>
    </Card>
  );
}
