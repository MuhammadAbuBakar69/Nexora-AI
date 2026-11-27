"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "violet" | "blue" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-mono font-bold uppercase select-none border";

  const sizeStyles = {
    sm: "text-[9px] px-1.5 py-0.5 tracking-wider",
    md: "text-[10px] px-2 py-0.5 tracking-wider",
  };

  const variantStyles = {
    default: "bg-[#F6F6F3] text-[#333333] border-[#E2E2DA]",
    violet: "bg-[#F4F0FF] text-[#5533FF] border-[#D4C4FF]",
    blue: "bg-[#EEF4FF] text-[#1D4ED8] border-[#BFDBFE]",
    success: "bg-[#EDFCF2] text-[#15803D] border-[#BBF7D0]",
    warning: "bg-[#FEFCE8] text-[#A16207] border-[#FEF08A]",
    danger: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
    outline: "bg-transparent text-[#555562] border-[#E2E2DA]",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
