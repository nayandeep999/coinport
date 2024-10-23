"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean; // Add disabled property
}

export const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick} // Prevent onClick if disabled
      type="button"
      className={`text-white bg-zinc-800 hover:bg-gray-700 border border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} // Adjust styles if disabled
      disabled={disabled} // Set disabled attribute
    >
      {children}
    </button>
  );
};
