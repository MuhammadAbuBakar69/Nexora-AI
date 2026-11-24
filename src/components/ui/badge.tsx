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
  const baseStyles = "inline-flex items-center font-semibold rounded-full tracking-wide select-none";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-xs px-3 py-1 font-semibold",
  };

  const variantStyles = {
    default: "bg-surface text-[#4a4a58] border border-border font-semibold",
    violet: "bg-violet-light/90 text-violet-primary border border-violet-soft/40 font-semibold shadow-sm",
    blue: "bg-blue-light/90 text-indigo-800 border border-blue-soft/40 font-semibold",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-300/80 font-semibold",
    warning: "bg-amber-50 text-amber-800 border border-amber-300/80 font-semibold",
    danger: "bg-rose-50 text-rose-800 border border-rose-300/80 font-semibold",
    outline: "bg-transparent text-[#4a4a58] border border-border font-semibold",
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
