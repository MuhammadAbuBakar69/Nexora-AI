"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-white border border-[#E2E2DA] p-6 font-sans",
        "before:content-['+'] before:absolute before:-top-2 before:-left-2 before:text-[10px] before:font-mono before:text-[#999990] before:select-none",
        "after:content-['+'] after:absolute after:-bottom-2 after:-right-2 after:text-[10px] after:font-mono after:text-[#999990] after:select-none",
        hoverEffect && "transition-all duration-200 hover:border-[#111111]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1 mb-4 pb-3 border-b border-[#E2E2DA]", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm sm:text-base font-bold uppercase tracking-tight text-[#111111] font-mono", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-[#555562] font-mono leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}
