import { Card } from "./ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card className="p-6 border-gray-700 h-full">
      <div className="flex flex-col gap-2 mt-2">
        <h1 className="text-xl font-bold text-gray-300">Balance</h1>
        <hr className="border-gray-700 mb-2" />
        <div className="flex justify-between border-b text-gray-300 border-gray-700 py-2">
          <div>Unlocked balance</div>
          <div>{amount / 100} INR</div>
        </div>

        <div className="flex justify-between border-b text-gray-300 border-gray-700 py-2">
          <div>Total Locked Balance</div>
          <div>{locked / 100} INR</div>
        </div>
        <div className="flex justify-between border-b text-gray-300 border-gray-700 py-2">
          <div>Total Balance</div>
          <div>{(locked + amount) / 100} INR</div>
        </div>
      </div>
    </Card>
  );
};
