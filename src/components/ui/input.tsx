"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1 font-sans">
        {label && (
          <label htmlFor={id} className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#777783]">
            // {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[#777783]">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              "w-full bg-white border border-[#E2E2DA] px-3 py-2 text-xs font-mono text-[#111111] placeholder:text-[#999990] focus:outline-none focus:border-[#111111] transition-colors",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              error && "border-rose-500 focus:border-rose-600",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-[#777783]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-[10px] font-mono text-rose-600">{error}</p>
        ) : helperText ? (
          <p className="text-[10px] font-mono text-[#777783]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
