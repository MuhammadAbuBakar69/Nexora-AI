"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "dark" | "violet";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  href?: string;
  external?: boolean;
}

export const buttonVariants = ({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
} = {}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-mono font-bold uppercase select-none disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer";

  const sizeStyles = {
    sm: "text-[11px] px-3 py-1.5 h-8 gap-1.5 tracking-wider border",
    md: "text-xs px-4 py-2 h-9 gap-2 tracking-wider border",
    lg: "text-xs px-6 py-3 h-11 gap-2.5 tracking-wider border",
    icon: "w-8 h-8 p-0 border",
  };

  const variantStyles = {
    primary:
      "bg-[#111111] text-white border-[#111111] hover:bg-[#2A2A2A] hover:border-[#2A2A2A]",
    violet:
      "bg-[#5533FF] text-white border-[#5533FF] hover:bg-[#4422EE]",
    secondary:
      "bg-white text-[#111111] border-[#E2E2DA] hover:bg-[#F6F6F3] hover:border-[#111111]",
    outline:
      "bg-transparent text-[#111111] border-[#E2E2DA] hover:bg-white hover:border-[#111111]",
    ghost:
      "bg-transparent text-[#555562] border-transparent hover:bg-white hover:text-[#111111] hover:border-[#E2E2DA]",
    danger:
      "bg-rose-600 text-white border-rose-600 hover:bg-rose-700",
    dark:
      "bg-[#111111] text-white border-[#333333] hover:bg-black",
  };

  return cn(baseStyles, sizeStyles[size], variantStyles[variant], className);
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      href,
      external,
      ...props
    },
    ref
  ) => {
    const combinedClasses = buttonVariants({ variant, size, className });

    // When an href is provided, render a direct, valid <a> tag rather than a nested <button>
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current"
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
