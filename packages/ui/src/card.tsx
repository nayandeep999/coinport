import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col h-full w-full border p-6 rounded-xl bg-zinc-800 border-zinc-700 flex-grow">
      <h1 className="text-xl text-center text-gray-200 font-bold border-b pb-2 mb-4">
        {title}
      </h1>
      <div className="flex w-full items-center justify-center text-gray-200">
        {children}
      </div>
    </div>
  );
}
