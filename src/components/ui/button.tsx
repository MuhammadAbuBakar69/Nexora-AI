"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "dark" | "violet";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] hover:-translate-y-0.5 cursor-pointer";

    const sizeStyles = {
      sm: "text-xs px-4 py-1.5 h-8 gap-1.5 font-semibold tracking-tight",
      md: "text-sm px-5 py-2.5 h-10 gap-2 font-semibold tracking-tight",
      lg: "text-base px-7 py-3.5 h-12 gap-2.5 font-bold tracking-tight",
      icon: "w-9 h-9 p-0 rounded-full",
    };

    const variantStyles = {
      primary:
        "bg-[#111111] text-white hover:bg-[#202025] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]",
      violet:
        "bg-gradient-to-r from-violet-primary via-[#6846FF] to-[#8C74FF] text-white shadow-[0_4px_14px_rgba(117,87,255,0.35)] hover:shadow-[0_8px_25px_rgba(117,87,255,0.5)] hover:brightness-105 border border-white/20",
      secondary:
        "bg-surface text-foreground font-semibold border border-border hover:bg-white hover:border-violet-soft/60 hover:shadow-subtle",
      outline:
        "bg-transparent text-foreground font-semibold border border-border hover:border-violet-primary hover:text-violet-primary hover:bg-violet-light/30",
      ghost:
        "bg-transparent text-foreground font-semibold hover:bg-surface hover:text-[#111111]",
      danger:
        "bg-rose-600 text-white font-semibold hover:bg-rose-700 shadow-sm",
      dark:
        "bg-[#100E20] text-white font-semibold hover:bg-[#1a1733] border border-surface-borderDark hover:border-violet-soft/40 shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
