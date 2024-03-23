"use client";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { createOnRampTransaction } from "../../app/lib/actions/createOnrampTransaction";
import { Card } from "./ui/card";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
  },
  {
    name: "Axis Bank",
  },
];

export const AddMoney = () => {
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState(""); // State for the success message
  const [isProcessing, setIsProcessing] = useState(false); // State for disabling button

  const handleAddMoney = async () => {
    setIsProcessing(true); // Disable button when processing
    try {
      await createOnRampTransaction(provider, value);
      setMessage("Money added successfully!");
      
      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage("Failed to add money.");
    } finally {
      setIsProcessing(false); // Re-enable button after transaction
    }
  };

  return (
    <Card className="p-6 border-gray-700 h-full">
      <div className="flex flex-col gap-2 text-gray-300 mt-2">
        <h1 className="text-xl font-bold text-gray-300">Add Money</h1>
        <hr className="border-gray-700 mb-2" />
        
        {/* Input field for amount */}
        <TextInput
          label={"Amount"}
          placeholder={"Enter Amount"}
          onChange={(val) => {
            setValue(Number(val));
          }}
        />

        <div className="py-4 text-gray-300 text-left">Bank</div>
        
        {/* Dropdown to select provider */}
        <Select
          onSelect={(value) => {
            setProvider(value);
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />

        <div className="flex justify-center pt-4">
          {/* Add Money button */}
          <button
            onClick={handleAddMoney}
            disabled={isProcessing} // Disable button when processing
            className={`px-2 py-3 w-full text-md mb-2 mt-2 ${isProcessing ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-md`}
          >
            {isProcessing ? "Processing..." : "Add Money"}
          </button>
        </div>

        {/* Display success or error message */}
        {message && <p className="text-center mt-4 text-green-500">{message}</p>}
      </div>
    </Card>
  );
};
