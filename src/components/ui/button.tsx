import { cn } from "../../lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-semibold transition-colors",
        "bg-red-500 text-white hover:bg-red-600",
        className
      )}
      {...props}
    />
  );
}
