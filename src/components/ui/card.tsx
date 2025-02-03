import { cn } from "../../lib/utils";
import { ReactNode } from "react";
import React from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(" rounded-lg p-4", className)}>
      {children}
    </div>
  );
}
