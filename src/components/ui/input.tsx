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
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-xs font-medium text-foreground tracking-wide">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-secondary">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              "w-full rounded-xl bg-surface border border-border px-3.5 py-2.5 text-sm text-foreground placeholder:text-secondary/60 focus:outline-none focus:bg-white focus:border-violet-primary focus:ring-2 focus:ring-violet-primary/10 transition-all duration-200",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-secondary">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
